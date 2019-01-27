using System;
using System.Collections.Generic;
using System.Text;

namespace EconRentCar.Core
{
    public class GetPaging<T> where T : class
    {
        public GetPaging(IEnumerable<T> data, int page, int totalRecord, int pageSize)
        {
            Data = data;
            TotalRecords = totalRecord;
            PageSize = pageSize;
            Page = page;
        }

        public GetPaging()
        {
            Data = new List<T>();
        }

        public IEnumerable<T> Data { get; set; }


        public int TotalPages
        {
            get { return (int)Math.Ceiling((double)TotalRecords / PageSize); }
        }

        public int TotalRecords { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
    }
}
