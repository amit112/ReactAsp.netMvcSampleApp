using ReactAspSampleAppByAmit.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ReactAspSampleAppByAmit.Controllers
{
    public class EmployeeApiController : ApiController
    {
       private AppDbContext db =new AppDbContext();
      
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            try
            {
                var employees = db.Employees.OrderBy(r => r.Id);
                return Request.CreateResponse(HttpStatusCode.OK, employees);

            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            try
            {
                var employee = db.Employees.Where(r => r.Id==id).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, employee);

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpPost]
        public HttpResponseMessage Create(Employee model)
        {
            try
            {
                db.Employees.Add(model);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Employee added successfully" });

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpPut]
        public HttpResponseMessage Update(Employee model)
        {
            try
            {
                db.Entry(model).State = EntityState.Modified;
                db.SaveChanges();
                
            
                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Employee updated successfully" });



            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                var employee = db.Employees.Where(r => r.Id == id).FirstOrDefault();
                db.Entry(employee).State = EntityState.Modified;
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Employee deleted successfully" });


            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

    }
}
