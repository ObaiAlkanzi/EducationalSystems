using EducationalSystem.Controllers.Api.Sm;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudentLibrary.STUDENT;
using System.Data;

namespace Student.tests
{
    [TestClass]
    public class UnitTest1
    {
       

        [TestMethod]
        public void GetStudent_int_ReturnListOfUnits()
        {

            
            ActionResult actionResult;
            SM_STUDENT testData = new SM_STUDENT();
            //var result = ActionHandler(testData);
        }
    }
}