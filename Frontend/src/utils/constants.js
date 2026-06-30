export const SERVICES = [
  {
    id: "1",
    name: "Electrician",
    icon: "Zap",
    startingPrice: 299,
    category: "Repairs",
  },
  {
    id: "2",
    name: "Plumber",
    icon: "Wrench",
    startingPrice: 249,
    category: "Repairs",
  },
  {
    id: "3",
    name: "AC Service",
    icon: "Wind",
    startingPrice: 499,
    category: "Maintenance",
  },
  {
    id: "4",
    name: "Painter",
    icon: "Paintbrush",
    startingPrice: 122,
    category: "Renovation",
  }, // 12/sqft
  {
    id: "5",
    name: "Deep Cleaning",
    icon: "Sparkles",
    startingPrice: 1199,
    category: "Cleaning",
  },
  {
    id: "6",
    name: "Appliance Repair",
    icon: "MonitorSpeaker",
    startingPrice: 349,
    category: "Repairs",
  },
  {
    id: "7",
    name: "Carpenter",
    icon: "Hammer",
    startingPrice: 499,
    category: "Repairs",
  },
  {
    id: "8",
    name: "Bathroom Repair",
    icon: "Bath",
    startingPrice: 399,
    category: "Repairs",
  },
];

export const REVIEWS = [
  {
    id: "r1",
    reviewer: "Amit Patel",
    rating: 5,
    text: "Very professional, arrived on time!",
    date: "2024-01-12",
  },
  {
    id: "r2",
    reviewer: "Priya Singh",
    rating: 4.5,
    text: "Good work, fixed the issue quickly.",
    date: "2024-01-10",
  },
  {
    id: "r3",
    reviewer: "Rahul Sharma",
    rating: 5,
    text: "Highly recommend! Great expertise.",
    date: "2024-01-05",
  },
  {
    id: "r4",
    reviewer: "Neha Gupta",
    rating: 4.8,
    text: "Technician was polite and solved the issue perfectly.",
    date: "2024-01-03",
  },
  {
    id: "r5",
    reviewer: "Rohit Verma",
    rating: 5,
    text: "Excellent service and affordable pricing.",
    date: "2023-12-28",
  },
  {
    id: "r6",
    reviewer: "Anjali Mishra",
    rating: 4.7,
    text: "Booking process was smooth and easy.",
    date: "2023-12-25",
  },
  {
    id: "r7",
    reviewer: "Vikas Yadav",
    rating: 3.9,
    text: "Professional arrived before time and completed work neatly.",
    date: "2023-12-20",
  },
  {
    id: "r8",
    reviewer: "Pooja Singh",
    rating: 5,
    text: "Best home service experience so far.",
    date: "2023-12-18",
  },
  {
    id: "r9",
    reviewer: "Sandeep Kumar",
    rating: 4.6,
    text: "Quick response and quality work.",
    date: "2023-12-15",
  },
  {
    id: "r10",
    reviewer: "Karan Mehta",
    rating: 5,
    text: "Very satisfied with the service.",
    date: "2023-12-12",
  },
];

export const PROVIDER_REVIEWS = {
  "Ramesh Kumar": [
    {
      id: 1,
      reviewer: "Amit Sharma",
      rating: 5,
      text: "Excellent electrician. Fixed all wiring issues very quickly.",
      date: "2026-06-10",
    },
    {
      id: 2,
      reviewer: "Neha Singh",
      rating: 4.9,
      text: "Very polite and professional service.",
      date: "2026-06-08",
    },
    {
      id: 3,
      reviewer: "Rahul Verma",
      rating: 5,
      text: "Highly recommended for home electrical work.",
      date: "2026-06-04",
    },
    {
      id: 4,
      reviewer: "Priya Patel",
      rating: 4.8,
      text: "Reached on time and completed work neatly.",
      date: "2026-05-29",
    },
  ],

  "Suresh Verma": [
    {
      id: 1,
      reviewer: "Pooja Gupta",
      rating: 4.7,
      text: "Leakage fixed within 30 minutes.",
      date: "2026-06-11",
    },
    {
      id: 2,
      reviewer: "Ankit Mishra",
      rating: 4.8,
      text: "Professional plumber with good behaviour.",
      date: "2026-06-07",
    },
    {
      id: 3,
      reviewer: "Sanjay Kumar",
      rating: 4.6,
      text: "Affordable pricing and quality work.",
      date: "2026-05-30",
    },
    {
      id: 4,
      reviewer: "Ritu Singh",
      rating: 4.9,
      text: "Very experienced plumber.",
      date: "2026-05-25",
    },
  ],

  "Vikas Yadav": [
    {
      id: 1,
      reviewer: "Rohit Singh",
      rating: 5,
      text: "AC cooling issue solved perfectly.",
      date: "2026-06-12",
    },
    {
      id: 2,
      reviewer: "Karan Patel",
      rating: 4.8,
      text: "Gas refill completed professionally.",
      date: "2026-06-09",
    },
    {
      id: 3,
      reviewer: "Manish Gupta",
      rating: 4.7,
      text: "Quick diagnosis and repair.",
      date: "2026-06-03",
    },
    {
      id: 4,
      reviewer: "Rakesh Sharma",
      rating: 4.9,
      text: "Excellent AC technician.",
      date: "2026-05-28",
    },
  ],

  "Rajeev Singh": [
    {
      id: 1,
      reviewer: "Komal Verma",
      rating: 4.5,
      text: "Painting quality was excellent and neat.",
      date: "2026-06-09",
    },
    {
      id: 2,
      reviewer: "Deepak Kumar",
      rating: 4.3,
      text: "Completed work before the promised time.",
      date: "2026-06-04",
    },
    {
      id: 3,
      reviewer: "Sneha Singh",
      rating: 4.7,
      text: "Very clean finishing and good behaviour.",
      date: "2026-05-28",
    },
  ],

  "Dinesh Patel": [
    {
      id: 1,
      reviewer: "Ravi Gupta",
      rating: 5,
      text: "Furniture repaired perfectly.",
      date: "2026-06-11",
    },
    {
      id: 2,
      reviewer: "Sonia Sharma",
      rating: 4.9,
      text: "Very skilled carpenter.",
      date: "2026-06-07",
    },
    {
      id: 3,
      reviewer: "Vikas Singh",
      rating: 5,
      text: "Door installation completed neatly.",
      date: "2026-05-31",
    },
  ],

  "Amit Yadav": [
    {
      id: 1,
      reviewer: "Anjali Gupta",
      rating: 4.8,
      text: "Quick electrical repair and very professional.",
      date: "2026-06-13",
    },
    {
      id: 2,
      reviewer: "Nikhil Verma",
      rating: 4.7,
      text: "Solved all wiring issues in one visit.",
      date: "2026-06-08",
    },
    {
      id: 3,
      reviewer: "Ritu Sharma",
      rating: 4.9,
      text: "Excellent electrician. Highly recommended.",
      date: "2026-06-03",
    },
  ],

  "Sonu Maurya": [
    {
      id: 1,
      reviewer: "Pallavi Singh",
      rating: 4.9,
      text: "Deep cleaning service was outstanding.",
      date: "2026-06-12",
    },
    {
      id: 2,
      reviewer: "Mohit Gupta",
      rating: 5,
      text: "House looks completely fresh after cleaning.",
      date: "2026-06-09",
    },
    {
      id: 3,
      reviewer: "Anu Verma",
      rating: 4.8,
      text: "Very professional cleaning team.",
      date: "2026-06-01",
    },
  ],

  "Pankaj Mishra": [
    {
      id: 1,
      reviewer: "Saurabh Patel",
      rating: 4.4,
      text: "Bathroom fittings were installed properly.",
      date: "2026-06-11",
    },
    {
      id: 2,
      reviewer: "Megha Singh",
      rating: 4.6,
      text: "Good finishing and reasonable pricing.",
      date: "2026-06-06",
    },
    {
      id: 3,
      reviewer: "Akash Sharma",
      rating: 4.5,
      text: "Satisfied with the bathroom repair work.",
      date: "2026-05-29",
    },
  ],

  "Rohit Sharma": [
    {
      id: 1,
      reviewer: "Ashutosh Singh",
      rating: 4.8,
      text: "Repaired my washing machine quickly and professionally.",
      date: "2026-06-14",
    },
    {
      id: 2,
      reviewer: "Nidhi Gupta",
      rating: 4.7,
      text: "Very knowledgeable appliance technician.",
      date: "2026-06-09",
    },
    {
      id: 3,
      reviewer: "Rahul Mishra",
      rating: 4.9,
      text: "Fridge repair completed on the same day.",
      date: "2026-06-03",
    },
  ],

  "Ankit Gupta": [
    {
      id: 1,
      reviewer: "Rohan Verma",
      rating: 4.9,
      text: "Excellent furniture installation work.",
      date: "2026-06-12",
    },
    {
      id: 2,
      reviewer: "Anjali Singh",
      rating: 4.8,
      text: "Professional carpenter with great finishing.",
      date: "2026-06-07",
    },
    {
      id: 3,
      reviewer: "Puneet Sharma",
      rating: 5,
      text: "Highly satisfied with wardrobe repair.",
      date: "2026-06-01",
    },
  ],

  "Deepak Singh": [
    {
      id: 1,
      reviewer: "Komal Gupta",
      rating: 4.6,
      text: "Painting work was completed neatly.",
      date: "2026-06-13",
    },
    {
      id: 2,
      reviewer: "Arjun Patel",
      rating: 4.7,
      text: "Very clean finishing and good colour matching.",
      date: "2026-06-08",
    },
    {
      id: 3,
      reviewer: "Ritika Sharma",
      rating: 4.8,
      text: "Professional painter. Recommended.",
      date: "2026-06-02",
    },
  ],

  "Shivam Rai": [
    {
      id: 1,
      reviewer: "Rakesh Verma",
      rating: 4.7,
      text: "Bathroom leakage fixed permanently.",
      date: "2026-06-11",
    },
    {
      id: 2,
      reviewer: "Sakshi Singh",
      rating: 4.8,
      text: "Professional plumber and very polite.",
      date: "2026-06-05",
    },
    {
      id: 3,
      reviewer: "Abhishek Kumar",
      rating: 4.9,
      text: "Excellent plumbing service.",
      date: "2026-05-30",
    },
  ],

  "Ajay Kumar": [
    {
      id: 1,
      reviewer: "Manoj Gupta",
      rating: 5,
      text: "Solved all electrical issues within an hour.",
      date: "2026-06-14",
    },
    {
      id: 2,
      reviewer: "Pooja Mishra",
      rating: 4.9,
      text: "Very experienced electrician.",
      date: "2026-06-09",
    },
    {
      id: 3,
      reviewer: "Vivek Singh",
      rating: 5,
      text: "Quick response and excellent service.",
      date: "2026-06-03",
    },
  ],

  "Nitin Singh": [
    {
      id: 1,
      reviewer: "Rohit Yadav",
      rating: 4.8,
      text: "AC service was completed professionally.",
      date: "2026-06-13",
    },
    {
      id: 2,
      reviewer: "Anjali Gupta",
      rating: 4.7,
      text: "Cooling issue fixed quickly.",
      date: "2026-06-08",
    },
    {
      id: 3,
      reviewer: "Kunal Sharma",
      rating: 4.9,
      text: "Very experienced AC technician.",
      date: "2026-06-01",
    },
  ],

  "Karan Patel": [
    {
      id: 1,
      reviewer: "Pankaj Verma",
      rating: 4.5,
      text: "RO filter replaced quickly.",
      date: "2026-06-12",
    },
    {
      id: 2,
      reviewer: "Sakshi Mishra",
      rating: 4.6,
      text: "Water purifier works perfectly now.",
      date: "2026-06-07",
    },
    {
      id: 3,
      reviewer: "Amit Singh",
      rating: 4.7,
      text: "Professional RO repair service.",
      date: "2026-05-31",
    },
  ],

  "Mohit Verma": [
    {
      id: 1,
      reviewer: "Vivek Sharma",
      rating: 4.9,
      text: "CCTV installation completed perfectly.",
      date: "2026-06-11",
    },
    {
      id: 2,
      reviewer: "Ritu Gupta",
      rating: 4.8,
      text: "Installed all cameras neatly.",
      date: "2026-06-06",
    },
    {
      id: 3,
      reviewer: "Neeraj Singh",
      rating: 5,
      text: "Very professional technician.",
      date: "2026-05-29",
    },
  ],

  "Abhishek Tiwari": [
    {
      id: 1,
      reviewer: "Priya Sharma",
      rating: 4.8,
      text: "Refrigerator repaired within one visit.",
      date: "2026-06-10",
    },
    {
      id: 2,
      reviewer: "Rohit Gupta",
      rating: 4.7,
      text: "Cooling problem solved completely.",
      date: "2026-06-05",
    },
    {
      id: 3,
      reviewer: "Ankit Yadav",
      rating: 4.9,
      text: "Excellent appliance repair expert.",
      date: "2026-05-30",
    },
  ],

  "Ashish Yadav": [
    {
      id: 1,
      reviewer: "Deepika Singh",
      rating: 4.8,
      text: "Washing machine repaired perfectly.",
      date: "2026-06-12",
    },
    {
      id: 2,
      reviewer: "Aman Verma",
      rating: 4.7,
      text: "Very professional technician.",
      date: "2026-06-06",
    },
    {
      id: 3,
      reviewer: "Sonal Gupta",
      rating: 4.9,
      text: "Quick diagnosis and repair.",
      date: "2026-05-28",
    },
  ],

  "Manoj Kumar": [
    {
      id: 1,
      reviewer: "Riya Sharma",
      rating: 4.9,
      text: "Kitchen cleaning was outstanding.",
      date: "2026-06-11",
    },
    {
      id: 2,
      reviewer: "Akash Gupta",
      rating: 5,
      text: "Everything looked brand new.",
      date: "2026-06-05",
    },
    {
      id: 3,
      reviewer: "Pooja Verma",
      rating: 4.8,
      text: "Very detailed cleaning work.",
      date: "2026-05-29",
    },
  ],

  "Rahul Gupta": [
    {
      id: 1,
      reviewer: "Neha Sharma",
      rating: 4.9,
      text: "Sofa cleaning was excellent. Looks like new again.",
      date: "2026-06-13",
    },
    {
      id: 2,
      reviewer: "Vikas Patel",
      rating: 4.8,
      text: "Very professional cleaning service.",
      date: "2026-06-08",
    },
    {
      id: 3,
      reviewer: "Amit Verma",
      rating: 5,
      text: "Highly recommended for sofa cleaning.",
      date: "2026-06-02",
    },
  ],

  "Vivek Mishra": [
    {
      id: 1,
      reviewer: "Rohit Singh",
      rating: 4.7,
      text: "Pest control service was effective.",
      date: "2026-06-12",
    },
    {
      id: 2,
      reviewer: "Sakshi Gupta",
      rating: 4.8,
      text: "No pest problems after the treatment.",
      date: "2026-06-07",
    },
    {
      id: 3,
      reviewer: "Pooja Sharma",
      rating: 4.9,
      text: "Professional team with good behaviour.",
      date: "2026-05-31",
    },
  ],

  "Arvind Singh": [
    {
      id: 1,
      reviewer: "Manish Kumar",
      rating: 4.8,
      text: "Water tank cleaned thoroughly.",
      date: "2026-06-11",
    },
    {
      id: 2,
      reviewer: "Ritu Singh",
      rating: 4.9,
      text: "Excellent hygiene standards.",
      date: "2026-06-05",
    },
    {
      id: 3,
      reviewer: "Deepak Verma",
      rating: 5,
      text: "Very satisfied with the service.",
      date: "2026-05-29",
    },
  ],

  "Sachin Yadav": [
    {
      id: 1,
      reviewer: "Karan Gupta",
      rating: 4.8,
      text: "Fixed my switchboard within minutes.",
      date: "2026-06-10",
    },
    {
      id: 2,
      reviewer: "Anjali Mishra",
      rating: 4.7,
      text: "Very skilled electrician.",
      date: "2026-06-04",
    },
    {
      id: 3,
      reviewer: "Ravi Singh",
      rating: 4.9,
      text: "Professional and punctual service.",
      date: "2026-05-30",
    },
  ],

  "Sanjay Gupta": [
    {
      id: 1,
      reviewer: "Priya Verma",
      rating: 5,
      text: "Excellent electrical repair work.",
      date: "2026-06-12",
    },
    {
      id: 2,
      reviewer: "Nitin Sharma",
      rating: 4.9,
      text: "Very experienced electrician.",
      date: "2026-06-06",
    },
    {
      id: 3,
      reviewer: "Aakash Singh",
      rating: 5,
      text: "Quick response and quality work.",
      date: "2026-06-01",
    },
  ],

  "Vikash Yadav": [
    {
      id: 1,
      reviewer: "Saurabh Gupta",
      rating: 4.8,
      text: "AC servicing completed perfectly.",
      date: "2026-06-13",
    },
    {
      id: 2,
      reviewer: "Riya Mishra",
      rating: 4.9,
      text: "Cooling performance improved a lot.",
      date: "2026-06-08",
    },
    {
      id: 3,
      reviewer: "Mohit Singh",
      rating: 5,
      text: "Very professional AC technician.",
      date: "2026-06-02",
    },
  ],
};

export const BOOKINGS = [
  {
    id: "b1",
    serviceId: "1",
    providerId: "p1",
    date: "2023-11-20",
    time: "10:00 AM",
    status: "Confirmed",
    amount: 299,
  },
  {
    id: "b2",
    serviceId: "3",
    providerId: "p3",
    date: "2023-11-21",
    time: "02:00 PM",
    status: "Upcoming",
    amount: 499,
  },
  {
    id: "b3",
    serviceId: "2",
    providerId: "p2",
    date: "2023-10-15",
    time: "11:00 AM",
    status: "Done",
    amount: 249,
  },
  {
    id: "b4",
    serviceId: "5",
    providerId: "p5",
    date: "2023-10-10",
    time: "09:00 AM",
    status: "Done",
    amount: 999,
  },
  {
    id: "b5",
    serviceId: "8",
    providerId: "p8",
    date: "2023-09-25",
    time: "04:00 PM",
    status: "Done",
    amount: 399,
  },

];
