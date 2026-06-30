require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/db");

const User = require("./models/user.model");
const Provider = require("./models/provider.model");

connectDB();

const seed = async () => {
  try {
    console.log("Connected to MongoDB");

    await Provider.deleteMany({});
    await User.deleteMany({ role: "provider" });

    console.log("Old providers deleted");

    // Yahin se next step me provider insert karenge
    const providerData = [
      {
        name: "Ramesh Kumar",
        email: "ramesh@homefix.com",
        mobile: "9876543210",
        trade: "Electrician",
        city: "Gorakhpur",
        price: 299,

        experience: 12,
        rating: 5.0,
        totalReviews: 284,
        totalJobs: 985,
        onTimePercent: 99,

        bio: "Experienced electrician with 12+ years of expertise in home wiring, fan installation, switchboard repair and electrical maintenance.",

        languages: ["Hindi", "English"],

        responseTime: "10 mins",

        serviceRadius: 20,

        lastActive: "Online",
      },
      {
        name: "Suresh Verma",
        email: "suresh@homefix.com",
        mobile: "9876543211",
        trade: "Plumber",
        city: "Gorakhpur",
        price: 249,

        experience: 8,
        rating: 4.8,
        totalReviews: 156,
        totalJobs: 520,
        onTimePercent: 97,

        bio: "Professional plumber specializing in bathroom fittings, leakage repair and pipe installation.",

        languages: ["Hindi"],

        responseTime: "15 mins",

        serviceRadius: 25,

        lastActive: "5 mins ago",
      },
      {
        name: "Vikas Yadav",
        email: "vikas@homefix.com",
        mobile: "9876543212",
        trade: "AC Service",
        city: "Gorakhpur",
        price: 499,

        experience: 6,
        rating: 4.5,
        totalReviews: 92,
        totalJobs: 318,
        onTimePercent: 95,

        bio: "Experienced electrician with 6+ years of expertise in home wiring, AC installation, switchboard repair and electrical maintenance.",

        languages: ["Hindi", "English"],

        responseTime: "10 mins",

        serviceRadius: 20,

        lastActive: "Online",
      },
      {
        name: "Rajeev Singh",
        email: "rajeev@homefix.com",
        mobile: "9876543213",
        trade: "Painter",
        city: "Gorakhpur",
        price: 199,

        experience: 4,
        rating: 3.8,
        totalReviews: 41,
        totalJobs: 105,
        onTimePercent: 89,

        bio: "Professional painter specializing in interior, exterior and texture painting.",

        languages: ["Hindi"],

        responseTime: "18 mins",

        serviceRadius: 20,

        lastActive: "Online",
      },
      {
        name: "Dinesh Patel",
        email: "dinesh@homefix.com",
        mobile: "9876543214",
        trade: "Carpenter",
        city: "Gorakhpur",
        price: 399,

        experience: 15,
        rating: 4.9,
        totalReviews: 337,
        totalJobs: 1240,
        onTimePercent: 99,

        bio: "Experienced carpenter for furniture repair, wardrobes and wooden fittings.",

        languages: ["Hindi","English"],

        responseTime: "12 mins",

        serviceRadius: 25,

        lastActive: "Online",
      },
      {
        name: "Amit Yadav",
        email: "amit@homefix.com",
        mobile: "9876543215",
        trade: "Electrician",
        city: "Lucknow",
        price: 349,

        experience: 5,
        rating: 3.9,
        totalReviews: 137,
        totalJobs: 124,
        onTimePercent: 79,

        bio: "Certified electrician for wiring, MCB, switches and home electrical maintenance.",

        languages: ["Hindi"],

        responseTime: "20 mins",

        serviceRadius: 18,

        lastActive: "8 mins ago",
      },
      {
        name: "Sonu Maurya",
        email: "sonu@homefix.com",
        mobile: "9876543216",
        trade: "Deep Cleaning",
        city: "Varanasi",
        price: 1499,

        experience: 2,
        rating: 4.2,
        totalReviews: 137,
        totalJobs: 140,
        onTimePercent: 89,

        bio: "Deep cleaning specialist for kitchens, bathrooms and complete home cleaning.",

        languages: ["Hindi"],

        responseTime: "15 mins",

        serviceRadius: 25,

        lastActive: "Online",
      },
      {
        name: "Pankaj Mishra",
        email: "pankaj@homefix.com",
        mobile: "9876543217",
        trade: "Bathroom Repair",
        city: "Prayagraj",
        price: 399,

        experience: 9,
        rating: 4.7,
        totalReviews: 337,
        totalJobs: 1240,
        onTimePercent: 92,

        bio: "Bathroom repair specialist with expertise in fittings, leakage repair and sanitary installations.",

        languages: ["Hindi", "English"],

        responseTime: "16 mins",

        serviceRadius: 22,

        lastActive: "Online",
      },
      {
        name: "Rohit Sharma",
        email: "rohit@homefix.com",
        mobile: "9876543218",
        trade: "Appliance Repair",
        city: "Kanpur",
        price: 349,

        experience: 1,
        rating: 4.6,
        totalReviews: 137,
        totalJobs: 240,
        onTimePercent: 95,

        bio: "Appliance repair technician for washing machines, refrigerators, microwave ovens and televisions.",

        languages: ["Hindi"],

        responseTime: "14 mins",

        serviceRadius: 20,

        lastActive: "5 mins ago",
      },
      {
        name: "Ankit Gupta",
        email: "ankit@homefix.com",
        mobile: "9876543219",
        trade: "Carpenter",
        city: "Noida",
        price: 499,

        experience: 10,
        rating: 4.7,
        totalReviews: 337,
        totalJobs: 1240,
        onTimePercent: 99,

        bio: "Professional carpenter for furniture making, wooden flooring, wardrobes and home interior work.",

        languages: ["Hindi", "English"],

        responseTime: "13 mins",

        serviceRadius: 28,

        lastActive: "Online",
      },
      {
        name: "Deepak Singh",
        email: "deepak@homefix.com",
        mobile: "9876543220",
        trade: "Painter",
        city: "Ghaziabad",
        price: 299,

        experience: 3,
        rating: 4.1,
        totalReviews: 137,
        totalJobs: 140,
        onTimePercent: 97,

        bio: "Experienced painter providing interior, exterior and decorative painting services.",

        languages: ["Hindi"],

        responseTime: "22 mins",

        serviceRadius: 20,

        lastActive: "12 mins ago",
      },
      {
        name: "Shivam Rai",
        email: "shivam@homefix.com",
        mobile: "9876543221",
        trade: "Plumber",
        city: "Ayodhya",
        price: 299,

        experience: 5,
        rating: 3.9,
        totalReviews: 337,
        totalJobs: 985,
        onTimePercent: 95,

        bio: "Expert plumber for pipe leakage, tap fitting, bathroom repair and plumbing maintenance.",

        languages: ["Hindi"],

        responseTime: "17 mins",

        serviceRadius: 24,

        lastActive: "Online",
      },
      {
        name: "Ajay Kumar",
        email: "ajay@homefix.com",
        mobile: "9876543222",
        trade: "Electrician",
        city: "Agra",
        price: 299,

        experience: 2,
        rating: 4.9,
        totalReviews: 337,
        totalJobs: 500,
        onTimePercent: 99,

        bio: "Trusted electrician for fan installation, switch replacement and complete electrical repair.",

        languages: ["Hindi", "English"],

        responseTime: "9 mins",

        serviceRadius: 20,

        lastActive: "Online",
      },
      {
        name: "Nitin Singh",
        email: "nitin@homefix.com",
        mobile: "9876543223",
        trade:  "AC Service",
        city: "Meerut",
        price: 599,

        experience: 2,
        rating: 4.2,
        totalReviews: 237,
        totalJobs: 560,
        onTimePercent: 92,

        bio: "Professional AC technician specializing in AC installation, gas refill, cooling repair and annual maintenance.",

        languages: ["Hindi", "English"],

        responseTime: "11 mins",

        serviceRadius: 25,

        lastActive: "Online",
      },
      {
        name: "Karan Patel",
        email: "karan@homefix.com",
        mobile: "9876543224",
        trade: "Appliance Repair",
        city: "Bareilly",
        price: 349,

        experience: 3,
        rating: 4.9,
        totalReviews: 350,
        totalJobs: 600,
        onTimePercent: 98,

        bio: "RO and water purifier expert for installation, filter replacement and maintenance services.",

        languages: ["Hindi"],

        responseTime: "16 mins",

        serviceRadius: 20,

        lastActive: "6 mins ago",
      },
      {
        name: "Mohit Verma",
        email: "mohit@homefix.com",
        mobile: "9876543225",
        trade: "Electrician",
        city: "Aligarh",
        price: 699,

        experience: 4,
        rating: 4.5,
        totalReviews: 120,
        totalJobs: 140,
        onTimePercent: 87,

        bio: "CCTV installation specialist with expertise in home and office security systems.",

        languages: ["Hindi", "English"],

        responseTime: "18 mins",

        serviceRadius: 30,

        lastActive: "Online",
      },
      {
        name: "Abhishek Tiwari",
        email: "abhishek@homefix.com",
        mobile: "9876543226",
        trade: "Appliance Repair",
        city: "Mathura",
        price: 399,

        experience: 1,
        rating: 3.5,
        totalReviews: 150,
        totalJobs: 300,
        onTimePercent: 79,

        bio: "Refrigerator repair expert for cooling issues, compressor replacement and servicing.",

        languages: ["Hindi"],

        responseTime: "14 mins",

        serviceRadius: 22,

        lastActive: "Online",
      },
      {
        name: "Ashish Yadav",
        email: "ashish@homefix.com",
        mobile: "9876543227",
        trade: "Appliance Repair",
        city: "Jhansi",
        price: 399,

        experience: 3,
        rating: 4.9,
        totalReviews: 337,
        totalJobs: 1240,
        onTimePercent: 99,

        bio: "Experienced washing machine technician for installation, repair and maintenance.",

        languages: ["Hindi"],

        responseTime: "15 mins",

        serviceRadius: 24,

        lastActive: "9 mins ago",
      },
      {
        name: "Manoj Kumar",
        email: "manoj@homefix.com",
        mobile: "9876543228",
        trade: "Deep Cleaning",
        city: "Moradabad",
        price: 899,

        experience: 5,
        rating: 4.6,
        totalReviews: 137,
        totalJobs: 140,
        onTimePercent: 99,

        bio: "Professional kitchen cleaning expert offering deep cleaning and sanitization services.",

        languages: ["Hindi", "English"],

        responseTime: "20 mins",

        serviceRadius: 25,

        lastActive: "Online",
      },
      {
        name: "Rahul Gupta",
        email: "rahul@homefix.com",
        mobile: "9876543229",
        trade: "Deep Cleaning",
        city: "Saharanpur",
        price: 999,

        experience: 5,
        rating: 4.9,
        totalReviews: 437,
        totalJobs: 1240,
        onTimePercent: 98,

        bio: "Sofa and upholstery cleaning specialist using modern cleaning equipment.",

        languages: ["Hindi"],

        responseTime: "13 mins",

        serviceRadius: 20,

        lastActive: "Online",
      },
      {
        name: "Vivek Mishra",
        email: "vivek@homefix.com",
        mobile: "9876543230",
        trade: "Bathroom Repair",
        city: "Gonda",
        price: 799,

        experience: 7,
        rating: 4.7,
        totalReviews: 337,
        totalJobs: 800,
        onTimePercent: 99,

        bio: "Certified pest control technician for termite, cockroach, mosquito and rodent treatment.",

        languages: ["Hindi", "English"],

        responseTime: "17 mins",

        serviceRadius: 35,

        lastActive: "4 mins ago",
      },
      {
        name: "Arvind Singh",
        email: "arvind@homefix.com",
        mobile: "9876543231",
        trade: "Deep Cleaning",
        city: "Basti",
        price: 999,

        experience: 12,
        rating: 5.0,
        totalReviews: 2000,
        totalJobs: 3240,
        onTimePercent: 99,

        bio: "Water tank cleaning specialist ensuring hygienic and safe water storage solutions.",

        languages: ["Hindi"],

        responseTime: "19 mins",

        serviceRadius: 28,

        lastActive: "Online",
      },

      {
        name: "Sachin Yadav",
        email: "sachin@homefix.com",
        mobile: "9876543232",
        trade: "Electrician",
        city: "Deoria",
        price: 299,

        experience: 2,
        rating: 3.7,
        totalReviews: 140,
        totalJobs: 190,
        onTimePercent: 89,

        bio: "Reliable electrician for switchboard repair, wiring, fan installation and electrical safety inspection.",

        languages: ["Hindi"],

        responseTime: "10 mins",

        serviceRadius: 20,

        lastActive: "Online",
      },
      {
        name: "Sanjay Gupta",
        email: "sanjay@homefix.com",
        mobile: "9876543233",
        trade: "Electrician",
        city: "Gorakhpur",
        price: 299,

        experience: 2,
        rating: 3.6,
        totalReviews: 237,
        totalJobs: 280,
        onTimePercent: 99,

        bio: "Senior electrician with over 15 years of experience in residential and commercial electrical services.",

        languages: ["Hindi", "English"],

        responseTime: "8 mins",

        serviceRadius: 30,

        lastActive: "Online",
      },
      {
        name: "Vikash Yadav",
        email: "vikash@homefix.com",
        mobile: "9876543234",
        trade: "AC Service",
        city: "Gorakhpur",
        price: 499,

        experience: 1,
        rating: 3.4,
        totalReviews: 100,
        totalJobs: 120,
        onTimePercent: 99,

        bio: "AC service professional for installation, maintenance, gas charging and emergency repair.",

        languages: ["Hindi", "English"],

        responseTime: "12 mins",

        serviceRadius: 25,

        lastActive: "2 mins ago",
      }
    ];

    for (const item of providerData) {
      const user = await User.create({
        name: item.name,
        email: item.email,
        mobile: item.mobile,
        password: "HomeFix@123",
        role: "provider",
      });

      await Provider.create({
        user: user._id,
        trade: item.trade,
        city: item.city,

        experience: item.experience,
        pricePerHour: item.price,

        rating: item.rating,
        totalReviews: item.totalReviews,
        totalJobs: item.totalJobs,
        onTimePercent: item.onTimePercent,

        bio: item.bio,

        phone: item.mobile,

        email: item.email,

        languages: item.languages,

        responseTime: item.responseTime,

        serviceRadius: item.serviceRadius,

        lastActive: item.lastActive,

        isApproved: true,
        isAvailable: true,

        verification: {
          aadhaar: true,
          skillTest: true,
          backgroundCheck: true,
          homefixCertified: true,
        },
      });
    }

console.log("✅ Providers Seeded Successfully");
process.exit();

  } catch (err) {
    console.log(err);
  }
};

seed();