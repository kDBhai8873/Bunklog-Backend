import { Subject } from "../models/subject.model.js";
import AsyncHandler from "../utils/Asynchandler.js";

const addSubject = AsyncHandler(async (req, res) => {
  const { name, totalClasses, attendedClasses } = req.body;
  const { id } = req.user;

  if (!name || name.trim() === "") {
    return res
      .status(400)
      .json({ status: 400, message: "Enter the name Correctly" });
  }

  const subjectCreated = await Subject.create({
    user: id,
    name: name,
    totalClasses: totalClasses || 0,
    attendedClasses: attendedClasses || 0,
  });

  return res.status(200).json({
    status: 200,
    subjectCreated,
    message: "Subject Created Successfully",
  });
});

const getSubjects = AsyncHandler(async (req, res) => {
  const { id } = req.user;

  const allSubjects = await Subject.find({ user: id });

  return res.status(200).json({
    status: 200,
    data: allSubjects,
    message: "Subjects Fetched Successfully",
  });
});

const incrementAttendedClasses = AsyncHandler(async (req, res) => {
  const { subId } = req.params;
  const { id } = req.user;

  const updatedSubject = await Subject.findOneAndUpdate(
    {
      _id: subId,
      user: id, // assuming your schema has a user field
    },
    {
      $inc: { attendedClasses: 1 },
    },
    {
      returnDocument : 'after'
    }
  );

  return res.status(200).json({
    status: 200,
    data: updatedSubject,
    message: "Attended class increment successful",
  });
});

const decrementAttendedClasses = AsyncHandler(async (req, res) => {
  const { subId } = req.params;
  const { id } = req.user;

  const subject = await Subject.findOne({
    _id: subId,
    user: id,
  });

  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  if (subject.attendedClasses === 0) {
    return res.status(400).json({ message: "Already at 0" });
  }

  const updatedSubject = await Subject.findOneAndUpdate(
    {
      _id: subId,
      user: id,
    },
    {
      $inc: { attendedClasses: -1 },
    },
    {
      returnDocument : 'after'
    }
  );

  if (!updatedSubject) {
    return res.status(404).json({ message: "Subject not found" })
}

  return res.status(200).json({
    status: 200,
    data: updatedSubject,
    message: "Attended class decrement successful",
  });
});

const incrementTotalClasses = AsyncHandler(async (req, res) => {
  const { subId } = req.params;
  const { id } = req.user;

  const updatedSubject = await Subject.findOneAndUpdate(
    {
      _id: subId,
      user: id,
    },
    {
      $inc: { totalClasses: 1 },
    },
    {
      returnDocument : 'after'
    }
  );

  if (!updatedSubject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  return res.status(200).json({
    status: 200,
    data: updatedSubject,
    message: "Total class increment successful",
  });
});

const decrementTotalClasses = AsyncHandler(async (req, res) => {
  const { subId } = req.params;
  const { id } = req.user;

  const subject = await Subject.findOne({
    _id: subId,
    user: id,
  });

  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  if (subject.totalClasses === 0) {
    return res.status(400).json({ message: "Already at 0" });
  }

  const updatedSubject = await Subject.findOneAndUpdate(
    {
      _id: subId,
      user: id,
    },
    {
      $inc: { totalClasses: -1 },
    },
    {
      returnDocument : 'after',
    }
  );

  return res.status(200).json({
    status: 200,
    data: updatedSubject,
    message: "Total class decrement successful",
  });
});

export {
  addSubject,
  getSubjects,
  incrementAttendedClasses,
  decrementAttendedClasses,
  incrementTotalClasses,
  decrementTotalClasses,
};
