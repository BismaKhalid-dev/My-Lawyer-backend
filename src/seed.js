import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Lawyer from "./models/Lawyer.js";

dotenv.config();

const CATEGORY_SEED = [
  { label: "Civil Litigation", iconKey: "civil" },
  { label: "Criminal Defense", iconKey: "criminal" },
  { label: "Corporate Law", iconKey: "corporate" },
  { label: "Family Law", iconKey: "family" },
  { label: "Taxation", iconKey: "tax" },
  { label: "Property & Real Estate", iconKey: "property" },
  { label: "Employment & Labor", iconKey: "employment" },
  { label: "Immigration", iconKey: "immigration" },
  { label: "Intellectual Property", iconKey: "intellectual" },
  { label: "Constitutional Matters", iconKey: "constitutional" },
  { label: "Banking & Finance", iconKey: "banking" },
  { label: "NAB / FIA Cases", iconKey: "nab" },
  { label: "Medical Negligence", iconKey: "medical" },
  { label: "Human Rights", iconKey: "humanrights" },
];

const NAMES = [
  "Barrister Ahmed Raza",
  "Adv. Sana Khalid",
  "Adv. Bilal Tariq",
  "Adv. Mahnoor Fatima",
  "Adv. Usman Ali",
  "Adv. Hira Sheikh",
];

async function seed() {
  await connectDB();

  console.log("Clearing old data...");
  await Category.deleteMany();
  await Lawyer.deleteMany();

  console.log("Seeding categories...");
  const categories = await Category.insertMany(CATEGORY_SEED);

  console.log("Seeding lawyers...");
  const sampleReviews = [
    { name: "Ayesha", rating: 5, comment: "Very professional and delivered quick advice." },
    { name: "Bilal", rating: 4.8, comment: "Explained the case clearly and provided strong support." },
  ];

  const lawyerDocs = [];
  categories.forEach((cat) => {
    NAMES.forEach((name, i) => {
      lawyerDocs.push({
        name,
        category: cat._id,
        rating: parseFloat((4.5 + (i % 4) * 0.1).toFixed(1)),
        yearsExperience: 5 + i * 2,
        fee: 1500 + i * 500,
        supportsVideo: true,
        supportsInPerson: true,
        bio: `${name} is an expert in ${cat.label}.`,
        specializations: [cat.label, "Court Representation", "Legal Advice"],
        services: [
          `${cat.label} consultation`,
          "Case preparation and filing",
          "Legal advice and document review",
          "Court representation",
        ],
        education: "LL.B. (Hons), Punjab University",
        membership: "Pakistan Bar Council",
        verified: ["Provisional bar license", "High Court license"],
        experienceItems: [
          `About ${5 + i * 2} years in active legal practice.`,
          "Worked with a wide range of domestic and corporate clients.",
          "Handled high-value disputes and courtroom proceedings.",
        ],
        reviews: sampleReviews,
      });
    });
  });
  await Lawyer.insertMany(lawyerDocs);

  console.log("Admin verify account...");
  const adminEmail = "admin@merawakeel.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: "admin123",
      role: "admin",
    });
    console.log(`Admin created -> email: ${adminEmail} | password: admin123`);
  } else {
    console.log("Admin account already exists.");
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
