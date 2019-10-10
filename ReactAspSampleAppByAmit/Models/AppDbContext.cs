using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ReactAspSampleAppByAmit.Models
{
    public class AppDbContext:DbContext
    {
        public DbSet<Employee> Employees { get; set; }
    }
}