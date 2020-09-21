exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("classes")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("classes").insert([
        {
          name: "Boxing Fundamentals",
          type: "boxing",
          instructor_name: "Sam",
          start_time: "11:30 am",
          duration: "1 hour",
          intensity: "high",
          location: "remote",
          current: 10,
          maximum: 100,
        },
        {
          name: "Cycling intervals",
          type: "cycling",
          instructor_name: "Alex",
          start_time: "1:00 pm",
          duration: "1 hour",
          intensity: "medium",
          location: "Spin City",
          current: 20,
          maximum: 50,
        },
        {
          name: "German Volume Training",
          type: "weightlifting",
          instructor_name: "Sam",
          start_time: "2:00 pm",
          duration: "2 hours",
          intensity: "medium",
          location: "LA Fitness",
          current: 10,
          maximum: 20,
        },
      ]);
    });
};
