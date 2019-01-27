FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["EconRentCar.Api/EconRentCar.Api.csproj", "EconRentCar.Api/"]
RUN dotnet restore "EconRentCar.Api/EconRentCar.Api.csproj"
COPY . .
WORKDIR "/src/EconRentCar.Api"
RUN dotnet build "EconRentCar.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "EconRentCar.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "EconRentCar.Api.dll"]