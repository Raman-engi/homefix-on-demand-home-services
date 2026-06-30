import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  MapPin,
  Star,
  ThumbsUp,
  CalendarClock,
  ChevronRight,
  ChevronLeft,
  Heart,
  Share2,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import Skeleton from "../components/Skeleton";
import Button from "../components/Button";
import Badge from "../components/Badge";
import StarRating from "../components/StarRating";
import providerService from "../api/providerService";
import { PROVIDER_REVIEWS } from "../utils/constants";
import {
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";

const ProviderProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const problemExamples = {
  Electrician: [
    "Fan not working",
    "Light not turning on",
    "Switch board issue",
    "Power fluctuation",
    "Wiring issue",
  ],

  Plumber: [
    "Water leakage",
    "Tap repair",
    "Pipe blockage",
    "Bathroom fitting issue",
    "Water tank overflow",
  ],

  Carpenter: [
    "Door repair needed",
    "Furniture assembly",
    "Cabinet repair",
    "Wood polishing",
    "Bed repair",
  ],

  "AC Service": [
    "AC not cooling",
    "Gas refill required",
    "Water dripping from AC",
    "AC making noise",
    "Installation required",
  ],

  "Deep Cleaning": [
    "Kitchen deep cleaning",
    "Bathroom deep cleaning",
    "Sofa cleaning",
    "Floor scrubbing",
    "Full home sanitization",
  ],

  Painter: [
    "Wall repainting",
    "Texture paint",
    "Water damage repaint",
    "Interior painting",
    "Exterior painting",
  ],
};
  const [loading, setLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const reviews =
    PROVIDER_REVIEWS[provider?.name] || [];

  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      try {
        // Mocking provider fetch since providerService is missing
        const response = await providerService.getProviderById(id);

        console.log("Provider Response:", response);

        const p = response.data.provider;

        setProvider({
          ...p,

          id: p._id,

          name: p.user?.name || "Professional",

          email: p.email,

          phone: p.phone,

          city: p.city,

          trade: p.trade,

          bio: p.bio,

          languages: p.languages,

          responseTime: p.responseTime,

          serviceRadius: p.serviceRadius,

          lastActive: p.lastActive,

          rating: p.rating,

          experience: p.experience,

          reviews: p.totalReviews,

          onTimePercent: p.onTimePercent,

          isVerified: p.verification?.homefixCertified,
        });
      } catch (error) {
        console.error("Failed to fetch provider:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id, navigate]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
          <Skeleton className="h-48" variant="card" />
          <Skeleton className="h-64" variant="card" />
        </div>
      </PageWrapper>
    );
  }

  if (!provider) {
    return (
      <PageWrapper>
        <div className="max-w-4xl mx-auto p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Provider not found</h2>
          <Button onClick={() => navigate("/services")}>
            Back to Services
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={`${provider.name} - ${provider.trade}`}>
      {/* Header Profile */}
      <div className="bg-primary pb-24 pt-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-1 px-3 py-1.5 -ml-3 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-all group mb-4"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-primary flex-shrink-0">
              {provider.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">

                <div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
                    {provider.name}

                    {provider.isVerified && (
                      <ShieldCheck className="text-green-500 w-6 h-6" />
                    )}

                  </h1>

                  <p className="text-lg text-gray-600 font-medium">
                    {provider.trade}
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  {provider.isVerified && (
                    <Badge variant="success" className="px-3 py-1">
                      Verified Professional
                    </Badge>
                  )}

                  <button
                    onClick={() => setFavorite(!favorite)}
                    className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-red-50 transition"
                  >
                    <Heart
                      size={20}
                      className={
                        favorite
                          ? "text-red-500 fill-red-500"
                          : "text-gray-500"
                      }
                    />
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Profile link copied.");
                    }}
                    className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-blue-50 transition"
                  >
                    <Share2
                      size={20}
                      className="text-blue-600"
                    />
                  </button>

                </div>

              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600 mb-6 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {provider.city}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />{" "}
                  {provider.rating} ({provider.reviews} reviews)
                </span>
                <span>•</span>
                <span>{provider.experience} years experience</span>
              </div>

              {/* Fix Price Menu preview inside component if needed */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="gray">Home Repair</Badge>
                <Badge variant="gray">Installation</Badge>
                <Badge variant="gray">Maintenance</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border-t border-gray-200 bg-gray-50">
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {provider.rating}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                User Rating
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {provider.reviews}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Total Reviews
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {provider.experience}+
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Years Exp.
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {provider.onTimePercent}%
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                On-Time
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Fixed Price Menu */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-4">
                Describe Your Problem
              </h3>

              <p className="text-gray-600 leading-7">
                While booking, you can describe your issue in detail.
                For example:
              </p>

              <ul className="mt-4 space-y-2 text-gray-700">
                {(problemExamples[provider.trade] || []).map(
                  (item, index) => (
                    <li key={index}>• {item}</li>
                  )
                )}
              </ul>

              <div className="mt-5 p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
                The professional will review your problem and provide the best solution.
              </div>
            </div>

            {/* Verifications Checklist */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-4">Verifications & Trust</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                  <ShieldCheck className="text-green-500 shrink-0" size={20} />
                  <span className="text-sm font-medium text-green-900">
                    Identity Verified
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                  <ShieldCheck className="text-green-500 shrink-0" size={20} />
                  <span className="text-sm font-medium text-green-900">
                    Background Checked
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                  <ShieldCheck className="text-green-500 shrink-0" size={20} />
                  <span className="text-sm font-medium text-green-900">
                    Skill Tested
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                  <ShieldCheck className="text-green-500 shrink-0" size={20} />
                  <span className="text-sm font-medium text-green-900">
                    HomeFix Certified
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 sm:p-8">

              <h3 className="text-xl font-bold mb-4">
                About Professional
              </h3>

              <p className="text-gray-600 leading-8">
                {provider.bio}
              </p>

            </div>

            {/* Reviews */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 sm:p-8">

              <h3 className="text-xl font-bold mb-6">
                Customer Reviews
              </h3>

              {reviews.length === 0 ? (

                <p className="text-center text-gray-500 py-6">
                  No reviews available yet.
                </p>

              ) : (

                <div className="space-y-6">

                  {(showAllReviews
                    ? reviews
                    : reviews.slice(0, 3)
                  ).map((rev) => (

                    <div
                      key={rev.id}
                      className="pb-6 border-b last:border-0 last:pb-0"
                    >

                      <div className="flex justify-between items-start mb-2">

                        <div className="font-semibold text-gray-900">
                          {rev.reviewer}
                        </div>

                        <div className="text-xs text-gray-500">
                          {new Date(rev.date).toLocaleDateString()}
                        </div>

                      </div>

                      <StarRating
                        rating={rev.rating}
                        size={14}
                      />

                      <p className="mt-2 text-gray-600 text-sm">
                        {rev.text}
                      </p>

                    </div>

                  ))}

                </div>

              )}

              {reviews.length > 3 && (

                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="mt-6 text-primary font-semibold hover:underline"
                >
                  {showAllReviews
                    ? "Show Less"
                    : "View All Reviews"}
                </button>

              )}

            </div>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-4">
                <CalendarClock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Ready to book?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Schedule {provider.name.split(" ")[0]} for your service today.
              </p>
              <Button
                size="lg"
                className="w-full"
                rightIcon={<ChevronRight size={20} />}
                onClick={() => navigate(`/book/${provider.id}/schedule`)}
              >
                Book Now
              </Button>

              <Button
                size="lg"
                className="w-full mt-4"
                rightIcon={<ChevronRight size={20} />}
                onClick={() => navigate(`/book/${provider.id}/schedule`)}
              >
                Continue Booking
              </Button>

              <div className="mt-6 rounded-2xl bg-gray-50 border p-5">

                <h3 className="font-bold text-lg mb-4">
                  Professional Information
                </h3>

                <div className="space-y-3">

                  <div className="flex justify-between">
                    <span className="font-medium">
                      Languages
                    </span>

                    <span>
                      {provider.languages?.join(", ")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">
                      Response Time
                    </span>

                    <span>
                      {provider.responseTime}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">
                      Service Radius
                    </span>

                    <span>
                      {provider.serviceRadius} km
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">
                      Last Active
                    </span>

                    <span className="text-green-600 font-semibold">
                      🟢 {provider.lastActive}
                    </span>
                  </div>

                </div>

              </div>

              <div className="mt-6 rounded-2xl bg-gray-50 border p-5">

                <h3 className="font-bold text-lg mb-4">
                  Contact Information
                </h3>

                <div className="space-y-4">

                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-blue-600" />
                    <span>{provider.phone}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-red-500" />
                    <span>{provider.email}</span>
                  </div>

                </div>

              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">

                <Button
                  className="w-full"
                  onClick={() => navigate(`/book/${provider.id}/schedule`)}
                >
                  Continue Booking
                </Button>

                <p className="text-xs text-center text-gray-500">
                  Contact details become available after booking confirmation.
                </p>

              </div>

              <div className="mt-6 flex flex-col gap-2 w-full text-left text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-green-500" /> Secure
                  Payment
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp size={16} className="text-blue-500" /> Quality
                  Assured
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProviderProfilePage;
