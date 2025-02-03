import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowForward,
  CameraAlt,
  Face,
  Spa,
  VerifiedUser,
} from "@mui/icons-material";
import photo from "../assets/Untitled.jpeg";
export function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-tiga">
        {/* Hero Section */}
        <header className="container mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-hitam font-jura">
                AI Skin Analysis
              </h1>
              <p className="text-lg md:text-xl text-satu font-jura">
                Personalized skincare recommendations powered by AI
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-taro text-empat px-8 py-4 rounded-full text-lg hover:bg-dongker transition-all flex items-center gap-2 font-jura"
              >
                Start Analysis
                <ArrowForward className="animate-pulse" />
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="relative bg-empat p-8 rounded-3xl shadow-xl">
                <div className="relative aspect-square bg-dua rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={photo} />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-empat px-4 py-2 rounded-full shadow-md">
                    <span className="text-taro font-jura">
                      Analyzing Skin...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="bg-empat py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-hitam font-jura">
              Our Technology
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Face,
                  title: "Skin Assessment",
                  text: "Detailed analysis of 10+ skin parameters",
                },
                {
                  icon: Spa,
                  title: "Custom Routine",
                  text: "Tailored to your unique skin needs",
                },
                {
                  icon: VerifiedUser,
                  title: "Expert Verified",
                  text: "Dermatologist-approved recommendations",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-8 rounded-xl bg-tiga hover:bg-dua transition-colors"
                >
                  <feature.icon className="text-taro w-12 h-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-hitam font-jura">
                    {feature.title}
                  </h3>
                  <p className="text-satu font-jura">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-dongker text-empat py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-jura">
              Ready for Better Skin?
            </h2>
            <button
              onClick={() => navigate("/login")}
              className="bg-taro text-empat px-12 py-4 rounded-full text-lg font-semibold hover:bg-hitam transition-all font-jura"
            >
              Get Started
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
