using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using EconRentCar.Api.AuthServices;
using EconRentCar.Api.Helpers;
using EconRentCar.Api.Models;
using EconRentCar.DataModel;
using EconRentCar.Logics.Services;
using EconRentCar.Logics.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace EconRentCar.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly IEmpleadoService _empService;
        private readonly IMapper _mapper;
        public AuthController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IJwtFactory jwtFactory,
            IOptions<JwtIssuerOptions> jwtOptions,
            IEmpleadoService empService,
            IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _empService = empService;
            _mapper = mapper;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> LoginApi([FromBody]LoginViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.Email, credentials.Password);
            if (identity == null)
            {

                ModelState.AddModelError("acceso_fallido", "Username or Password invalid");
                return BadRequest(ModelState);
            }
            var user = await _userManager.FindByIdAsync(identity.Claims.Single(c => c.Type == "id").Value);
            var emp = _mapper.Map<EmpleadoRefVm>(_empService.FindBy(e => e.AppUserId == user.Id).FirstOrDefault());
            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.Email, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented },
                new {
                    user.Email,
                    user.UserName,
                    Empleado = emp
                });

            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}