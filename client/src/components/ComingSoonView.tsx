export const ComingSoonView = ({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: string[];
}) => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-8">{description}</p>
          <div className="bg-white rounded-2xl p-12 shadow-sm">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚧</span>
            </div>
            <h2 className="text-2xl text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're building this feature to enhance your African history
              learning experience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
              {features.map((feature, index) => (
                <div key={index}>{feature}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Construction, Github, Mail, Bell, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Construction Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <Construction className="w-12 h-12 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-6xl text-gray-900 mb-6">
          Coming
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
            Soon
          </span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We're working hard to bring you something amazing. This feature is
          currently under development and will be available soon!
        </p>

        {/* Feature Preview Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: Github,
              title: "Open Source",
              desc: "Community-driven development",
            },
            { icon: Bell, title: "Updates", desc: "Stay informed on progress" },
            {
              icon: CheckCircle,
              title: "Quality",
              desc: "Thoroughly tested features",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border-amber-200"
            >
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200 p-6 mb-8">
          <h3 className="text-xl text-gray-900 mb-4">
            Get Notified When It's Ready
          </h3>

          {!isSubscribed ? (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                <Bell className="w-4 h-4 mr-2" />
                Notify Me
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-600">
                Thanks! We'll notify you when it's ready.
              </p>
            </div>
          )}
        </Card>

        {/* Status Updates */}
        <div className="space-y-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Status: In Development
          </Badge>
          <div className="text-sm text-gray-500">Expected release: Q2 2024</div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-amber-600 text-amber-700 hover:bg-amber-50"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
