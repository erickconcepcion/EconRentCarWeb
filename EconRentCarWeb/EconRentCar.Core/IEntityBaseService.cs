using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace EconRentCar.Core
{
    public interface IEntityBaseService<T> where T : class, IEntityBase, new()
    {
        IEnumerable<T> Get();
        IEnumerable<T> GetIncluding(string includedProps);
        IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties);

        GetPaging<T> Get(int page, int pagesize,
            string searchPredicate,
            string logicalOperator,
            string orderBy,
            params Expression<Func<T, object>>[] includeProperties);

        T Find(Guid id);
        T Find(Expression<Func<T, bool>> predicate);
        T Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
        T Find(Guid id, string includedProps);
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        EntityActionResult Add(T value);
        EntityActionResult Update(T value);
        EntityActionResult Remove(T value);
        IEnumerable<EntityActionResult> RemoveWhereDelete(Expression<Func<T, bool>> predicate);
        void RemoveWhere(Expression<Func<T, bool>> predicate);
        void RemoveCollection(IEnumerable<T> entities);
        int Count(Expression<Func<T, bool>> predicate);
        void Delete(T entity);
        void DeleteRange(IEnumerable<T> entities);
        bool Save();
        IEnumerable<EntityActionResult> ValidateRange(IEnumerable<T> entities);
    }
}
