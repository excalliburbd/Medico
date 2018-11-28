var express = require("express");
var router  = express.Router();
var Doctor = require("../models/doctor");
var middleware = require("../middleware");


//INDEX - show all doctors
router.get("/", function(req, res){
    // Get all doctors from DB
    Doctor.find({}, function(err, allDoctors){
       if(err){
           console.log(err);
       } else {
          res.render("doctors/index",{doctors:allDoctors});
       }
    });
});

//CREATE - add new doctor to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to doctors array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newDoctor = {name: name, image: image, description: desc, author:author}
    // Create a new doctor and save to DB
    Doctor.create(newDoctor, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to doctors page
            console.log(newlyCreated);
            res.redirect("/doctors");
        }
    });
});

//NEW - show form to create new doctor
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("doctors/new"); 
});

// SHOW - shows more info about one doctor
router.get("/:id", function(req, res){
    //find the doctor with provided ID
    Doctor.findById(req.params.id).populate("comments").exec(function(err, foundDoctor){
        if(err){
            console.log(err);
        } else {
            console.log(foundDoctor)
            //render show template with that doctor
            res.render("doctors/show", {doctor: foundDoctor});
        }
    });
});

// EDIT Doctor ROUTE
router.get("/:id/edit", middleware.checkDoctorOwnership, function(req, res){
    Doctor.findById(req.params.id, function(err, foundDoctor){
        res.render("doctors/edit", {doctor: foundDoctor});
    });
});

// UPDATE Doctor ROUTE
router.put("/:id",middleware.checkDoctorOwnership, function(req, res){
    // find and update the correct doctor
    Doctor.findByIdAndUpdate(req.params.id, req.body.doctor, function(err, updatedDoctor){
       if(err){
           res.redirect("/doctors");
       } else {
           //redirect somewhere(show page)
           res.redirect("/doctors/" + req.params.id);
       }
    });
});

// DESTROY Doctor ROUTE
router.delete("/:id",middleware.checkDoctorOwnership, function(req, res){
   Doctor.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/doctors");
      } else {
          res.redirect("/doctors");
      }
   });
});


module.exports = router;

