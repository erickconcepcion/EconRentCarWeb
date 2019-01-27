using System;
using System.Linq;
using System.Linq.Expressions;
using FluentValidation;
using LinqKit;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace EconRentCar.Core
{
    public class EntityBaseRepository<T> : IEntityBaseRepository<T>
      where T : class, IEntityBase, new()
    {
        private DbContext _context;
        private DbSet<T> _set;
        

        public EntityBaseRepository(DbContext context)
        {
            _context = context;
            _set = context.Set<T>();
        }
        

        public virtual IEnumerable<T> Get()
        {
            return _set.AsEnumerable();
        }

        public virtual IEnumerable<T> GetIncluding(string includedProps ="")
        {
            
            return GetAll(includeProperties: includedProps);
        }


        public virtual GetPaging<T> Get(int page,
            int pagesize,
            string searchPredicate,
            string logicalOperator,
            string orderBy,
            params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _set;

            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            var predicateQuery = PredicateBuilder.New<T>(true);

            if (!string.IsNullOrEmpty(searchPredicate))
            {
                predicateQuery = searchPredicate.AsPredicate<T>((logicalOperator == "AND" ? AndOrOperator.And : AndOrOperator.Or));
                query = query.Where(predicateQuery);
            }
            query = !string.IsNullOrEmpty(orderBy) ? query.GetOrderBy(orderBy) : query.OrderBy(a => a.Id);
            //
            var data = query
                .Skip((page - 1) * pagesize)
                .Take(pagesize)
                .AsEnumerable();
            //
            return new GetPaging<T>(data, page, _set.Count(predicateQuery), pagesize);
        }

        private IQueryable<T> GetAll(Expression<Func<T, bool>> filter = null, string includeProperties = "", bool includeDeleted = false)
        {
            IQueryable<T> query = (includeDeleted) ? _set.AsQueryable() : _set.AsQueryable();
            query = includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                                     .Aggregate(query, (current, includeProperty) =>
                                                       current.Include(includeProperty));

            if (filter == null)
                filter = PredicateBuilder.New<T>(true);
            
            if (filter != null)
            {
                query = query.AsExpandable().Where(filter);
            }

            return query;
        }

        public int Count(Expression<Func<T, bool>> predicate = null)
        {
            return GetAll(predicate)
                .AsNoTracking()
                .Count();
        }


        public virtual IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _set;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query.AsEnumerable();
        }

        public T Find(Guid id)
        {
            return _set.AsNoTracking().FirstOrDefault(x => x.Id == id);
        }

        public T Find(Guid id, string includeProperties = "")
        {
            return GetAll(x => x.Id == id, includeProperties).FirstOrDefault();
        }

        public T Find(Expression<Func<T, bool>> predicate)
        {
            return _set.AsNoTracking().FirstOrDefault(predicate);
        }

        public T Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _set;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.Where(predicate).FirstOrDefault();
        }
        
        public virtual IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return _set.Where(predicate);
        }

        public virtual T Add(T entity)
        {
            if (entity.Id == Guid.Empty)
            {
                entity.Id = Guid.NewGuid();
            }
            _set.Add(entity);
            return entity;
        }

        public virtual T Update(T entity)
        {
            EntityEntry dbEntityEntry = _context.Entry(entity);
            dbEntityEntry.State = EntityState.Modified;
            return entity;
        }

        public virtual void Remove(T entity)
        {
            EntityEntry dbEntityEntry = _context.Entry(entity);
            dbEntityEntry.State = EntityState.Deleted;
            
        }

        public virtual void RemoveWhereDelete(Expression<Func<T, bool>> predicate)
        {
            IEnumerable<T> entities = _set.Where(predicate);
            foreach (var entity in entities)
            {
                Remove(entity);
            }
        }


        public virtual void RemoveWhere(Expression<Func<T, bool>> predicate)
        {
            IEnumerable<T> entities = _set.Where(predicate);

            foreach (var entity in entities)
            {
                _context.Entry(entity).State = EntityState.Deleted;
            }
        }

        public virtual void RemoveCollection(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
            {
               Remove(entity);
            }
        }
        public virtual void Delete(T entity)
        {
            _context.Entry(entity).State = EntityState.Deleted;
        }

        public virtual void DeleteRange(IEnumerable<T>entities)
        {
            foreach (var entity in entities)
            {
                _context.Entry(entity).State = EntityState.Deleted;
            }
        }

        public virtual bool Save()
        {
            return _context.SaveChanges()>0;
        }
    }
}
