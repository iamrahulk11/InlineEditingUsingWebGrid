using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Form3.Models;

namespace Form3.Controllers
{
    public class HomeController : Controller
    {
        form2dbEntities db = new form2dbEntities();
        public ActionResult Index()
        {
           /* List<userdb> list = new List<userdb>();
            var data = db.userdbs.ToList();
            foreach (var item in data)
            {
                userdb model = new userdb();
                model.userid = item.userid;
                model.User_Name = item.User_Name;
                model.Email = item.Email;
                model.Contact = item.Contact;
                model.Gender = item.Gender;
                model.Date_Of_Birth = item.Date_Of_Birth;
                model.Address = item.Address;
                model.Country = item.Country;
                model.State = item.State;
                model.Hobbies = item.Hobbies;
               // Session["img"] = item.ImagePath;
                model.ImagePath = item.ImagePath;
                list.Add(model);
            }

            return View(list);*/
            return View(db.userdbs.ToList());
        }

        [HttpPost]
        public ActionResult Update(userdb model)
        {
            List<userdb> list = new List<userdb>();
            if (model.FileName != null)
            {
                string fileName = Path.GetFileNameWithoutExtension(model.FileName.FileName);
                string extension = Path.GetExtension(model.FileName.FileName);
                HttpPostedFileBase postedFile = model.FileName;
                string FileLength = Convert.ToString(postedFile.ContentLength);

                fileName += extension;
                model.ImagePath = "~/images/" + fileName;
                fileName = Path.Combine(Server.MapPath("~/images/"), fileName);

                model.FileName.SaveAs(fileName);
                userdb user = db.userdbs.Where(u => u.userid == model.userid).FirstOrDefault();
                user.User_Name = model.User_Name;
                user.Email = model.Email;
                user.Contact = model.Contact;
                user.Gender = model.Gender;
                user.Date_Of_Birth = model.Date_Of_Birth;
                user.Address = model.Address;
                user.Country = model.Country;
                user.State = model.State;
                user.Hobbies = model.Hobbies;
                user.ImagePath = model.ImagePath;
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                list.Add(user);
                return RedirectToAction("Index");

            }
            else
            {
                userdb user = db.userdbs.Where(em => em.userid == model.userid).FirstOrDefault();
                 user.User_Name = model.User_Name;
                 user.Email = model.Email;
                 user.Contact = model.Contact;
                 user.Gender = model.Gender;
                 user.Date_Of_Birth = model.Date_Of_Birth;
                 user.Address = model.Address;
                 user.Country = model.Country;
                 user.State = model.State;
                 user.Hobbies = model.Hobbies;
                
                
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                list.Add(user);
                return RedirectToAction("Index"); 
            }
            
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";


            return View();
        }
    }
}