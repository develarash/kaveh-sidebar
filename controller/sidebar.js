const express = require("express");
const Sidebar = require("../model/sidebar");
const mongoose = require("mongoose");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");

// login user
router.post(
  "/create-sidebar",
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.body);

      const { caption, floor, row } = req.body;
      if (!caption || !floor || !row) {
        return next(new ErrorHandler("please fill all inputs", 400));
      }

      const rowDuplicated = await Sidebar.find({ row: row, floor: floor });
      console.log(rowDuplicated.length,"qqqq");

      if ( rowDuplicated.length !== 0) {
        console.log("na injas");

        const gratherThenInputRow = await Sidebar.find({})

          .where("row")
          .gt(row)
          .where("floor")
          .equals(floor)
          .sort({ row: 1 });
        console.log(gratherThenInputRow);
        gratherThenInputRow.forEach(async (element) => {
          console.log(element.row, "dsd");
          console.log(element.caption, "dsd");
          console.log(element.floor, "dsd");
            
          const filter = { floor: element.floor, row: element.row };

          const update = { row: element.row + 1 };
          



          await Sidebar.findOneAndUpdate(filter, update);



          


        });
        console.log(rowDuplicated,"5")
        
        return res.status(200).json({
            // create,
          });
      }

      console.log("injas");
      const create = await Sidebar.create({
        caption: caption,
        floor: floor,
        row: row,
      });
      //   const filter =
      //     {"floor":floor ,"row" : row}

      //   const update = { "caption": "arash2" };

      //   const update2= await Sidebar.findOneAndUpdate(filter,update)
      //
       return res.status(200).json({
        // create,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
