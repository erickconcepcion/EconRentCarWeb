using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace EconRentCar.Core
{
    public class EntityBaseService<T> : IEntityBaseService<T>
      where T : class, IEntityBase, new()
    {
        private IValidator<T> Validator;
        private IEntityBaseRepository<T> Repository;

        public EntityBaseService(IValidator<T> validator, IEntityBaseRepository<T>repository)
        {
            Validator = validator;
            Repository = repository;
        }

        public virtual IEnumerable<T> Get() => Repository.Get();

        public virtual IEnumerable<T> GetIncluding(string includedProps = "") => Repository.GetIncluding(includedProps);


        public virtual GetPaging<T> Get(int page,
            int pagesize,
            string searchPredicate,
            string logicalOperator,
            string orderBy,
            params Expression<Func<T, object>>[] includeProperties) 
            => Repository.Get(page, pagesize, searchPredicate,
                logicalOperator, orderBy, includeProperties);

        public int Count(Expression<Func<T, bool>> predicate = null) 
            => Repository.Count(predicate);


        public virtual IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties) 
            => Repository.AllIncluding(includeProperties);

        public T Find(Guid id) => Repository.Find(id);

        public T Find(Guid id, string includeProperties = "") => Repository.Find(id, includeProperties);

        public T Find(Expression<Func<T, bool>> predicate) => Repository.Find(predicate);

        public T Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties) 
            => Repository.Find(predicate, includeProperties);

        public virtual IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate) => Repository.FindBy(predicate);


        public virtual EntityActionResult Add(T entity)
        {
            if (entity.Id == Guid.Empty)
            {
                entity.Id = Guid.NewGuid();
            }
            
            var results = Validator.Validate(entity);
            if (results.IsValid)
            {
                Repository.Add(entity);
                return new EntityActionResult() { ErrorCode = 0, Success = true, Id = entity.Id };
            }
            var errosMsg = results.Errors.Select(e => new KeyValuePair<string, string>(e.ErrorCode, e.ErrorMessage));
            return new EntityActionResult() { ErrorCode = 500, Success = false, Messages = errosMsg };
        }

        public virtual EntityActionResult Update(T entity)
        {                       
            var results = Validator.Validate(entity);
            if (results.IsValid)
            {
                Repository.Update(entity);
                return new EntityActionResult() { ErrorCode = 0, Success = true, Id = entity.Id };
            }
            var errosMsg = results.Errors.Select(e => new KeyValuePair<string, string>(e.ErrorCode, e.ErrorMessage));
            return new EntityActionResult() { ErrorCode = 500, Success = false, Messages = errosMsg };
        }

        public virtual EntityActionResult Remove(T entity)
        {
            Repository.Remove(entity);
            return new EntityActionResult() { ErrorCode = 0, Success = true, Id = entity.Id };

        }

        public virtual IEnumerable<EntityActionResult> RemoveWhereDelete(Expression<Func<T, bool>> predicate)
        {
            IEnumerable<T> entities = Repository.FindBy(predicate);
            List<EntityActionResult> results = new List<EntityActionResult>();
            foreach (var entity in entities)
            {
                Remove(entity);
                results.Add(new EntityActionResult() { ErrorCode = 0, Success = true, Id = entity.Id });
            }
            return results;
        }
        
        public virtual void RemoveWhere(Expression<Func<T, bool>> predicate) => Repository.RemoveWhere(predicate);

        public virtual void RemoveCollection(IEnumerable<T> entities) => Repository.RemoveCollection(entities);

        public virtual void Delete(T entity) => Repository.Delete(entity);

        public virtual void DeleteRange(IEnumerable<T> entities) => Repository.DeleteRange(entities);

        public virtual bool Save() => Repository.Save();

        public virtual IEnumerable<EntityActionResult> ValidateRange(IEnumerable<T> entities)
        {
            List<EntityActionResult> results = new List<EntityActionResult>();
            foreach (var entity in entities)
            {
                var result = Validator.Validate(entity);
                if (result.IsValid)
                {
                    Repository.Add(entity);
                    results.Add(new EntityActionResult() { ErrorCode = 0, Success = true, Id = entity.Id });
                }
                else
                {
                    var errosMsg = result.Errors.Select(e => new KeyValuePair<string, string>(e.ErrorCode, e.ErrorMessage));
                    results.Add(new EntityActionResult() { ErrorCode = 500, Success = false, Messages = errosMsg as Dictionary<string, string> });
                }                
            }
            return results;
        }
    }
}
