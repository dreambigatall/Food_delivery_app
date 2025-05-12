// import { Link } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { ArrowRight, UtensilsCrossed, Clock, CreditCard } from "lucide-react"

// export default function HomePage() {
//   const features = [
//     {
//       icon: <UtensilsCrossed className="h-10 w-10 text-primary" />,
//       title: "Diverse Menu",
//       description: "Choose from a wide variety of delicious meals prepared by top chefs.",
//     },
//     {
//       icon: <Clock className="h-10 w-10 text-primary" />,
//       title: "Fast Delivery",
//       description: "Get your food delivered to your doorstep in 30 minutes or less.",
//     },
//     {
//       icon: <CreditCard className="h-10 w-10 text-primary" />,
//       title: "Easy Payment",
//       description: "Multiple payment options available for your convenience.",
//     },
//   ]

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="relative py-20 md:py-32 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />
//         <div className="container relative z-10">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
//               Delicious Food Delivered to Your Door
//             </h1>
//             <p className="text-xl md:text-2xl text-muted-foreground mb-8">
//               Order your favorite meals from the best restaurants in town and enjoy them in the comfort of your home.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button asChild size="lg" className="text-lg">
//                 <Link to="/menu">Order Now</Link>
//               </Button>
//               <Button asChild variant="outline" size="lg" className="text-lg">
//                 <Link to="/menu">View Menu</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-muted/30">
//         <div className="container">
//           <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
//                 <div className="mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Popular Categories */}
//       <section className="py-16">
//         <div className="container">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-3xl font-bold">Popular Categories</h2>
//             <Button asChild variant="ghost" className="gap-1">
//               <Link to="/menu">
//                 View All <ArrowRight className="h-4 w-4" />
//               </Link>
//             </Button>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {["Pizza", "Burgers", "Sushi", "Desserts"].map((category, index) => (
//               <Link key={index} to="/menu" className="relative rounded-lg overflow-hidden aspect-square group">
//                 <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=300')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300" />
//                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <h3 className="text-white text-xl font-bold">{category}</h3>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-primary text-primary-foreground">
//         <div className="container text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Order?</h2>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Satisfy your cravings with just a few clicks. Browse our menu and place your order now!
//           </p>
//           <Button asChild size="lg" variant="secondary" className="text-lg">
//             <Link to="/menu">Order Now</Link>
//           </Button>
//         </div>
//       </section>
//     </div>
//   )
// }

// import { Link } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { ArrowRight, UtensilsCrossed, Clock, CreditCard, Sparkles } from "lucide-react" // Added Sparkles for fun

// export default function HomePage() {
//   const features = [
//     {
//       icon: <UtensilsCrossed className="h-8 w-8 text-primary" />, // Slightly smaller icon
//       title: "Diverse Culinary Delights",
//       description: "Explore a vast menu curated by top chefs, offering flavors for every palate.",
//     },
//     {
//       icon: <Clock className="h-8 w-8 text-primary" />,
//       title: "Swift & Reliable Delivery",
//       description: "Your favorite meals, delivered fresh and fast to your doorstep—typically under 30 minutes.",
//     },
//     {
//       icon: <CreditCard className="h-8 w-8 text-primary" />,
//       title: "Seamless & Secure Payments",
//       description: "Enjoy a hassle-free checkout with multiple secure payment options.",
//     },
//   ]

//   const popularCategories = [
//     { name: "Pizza", imageQuery: "gourmet pizza" },
//     { name: "Burgers", imageQuery: "gourmet burger" },
//     { name: "Sushi", imageQuery: "sushi platter" },
//     { name: "Desserts", imageQuery: "chocolate dessert" },
//   ]

//   return (
//     <div className="bg-background text-foreground">
//       {/* Hero Section */}
//       <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
//         {/* Background Image */}
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?food,restaurant,dark')" }}
//         />
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 md:bg-gradient-to-r md:from-black/70 md:via-transparent" />

//         <div className="container relative z-10 px-4 py-20 md:py-32">
//           <div className="max-w-xl md:max-w-2xl mx-auto md:mx-0 md:text-left">
//             {/* You could add subtle entrance animation here using Framer Motion */}
//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
//               Savor the Flavor, <br /> Delivered to You.
//             </h1>
//             <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
//               Discover incredible meals from local restaurants. Effortless ordering, speedy delivery, unforgettable taste.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//               <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105">
//                 <Link to="/menu">Order Now</Link>
//               </Button>
//               <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105">
//                 <Link to="/menu">Explore Menu</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 md:py-24 bg-muted/20">
//         <div className="container px-4">
//           <div className="text-center mb-12 md:mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//               Why You'll Love <span className="text-primary">Our Service</span>
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               We're dedicated to bringing you the best food experience, right from your screen to your table.
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-card rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center md:items-start md:text-left"
//               >
//                 <div className="mb-5 bg-primary/10 p-4 rounded-full text-primary">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl md:text-2xl font-semibold mb-3">{feature.title}</h3>
//                 <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Popular Categories */}
//       <section className="py-16 md:py-24">
//         <div className="container px-4">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-10 md:mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-0">
//               Explore Popular Categories
//             </h2>
//             <Button asChild variant="ghost" className="text-primary hover:text-primary/80 transition-colors">
//               <Link to="/menu" className="flex items-center gap-2 text-md">
//                 View All Categories <ArrowRight className="h-5 w-5" />
//               </Link>
//             </Button>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//             {popularCategories.map((category, index) => (
//               <Link
//                 key={index}
//                 to={`/menu?category=${category.name.toLowerCase()}`} // Make link functional
//                 className="relative rounded-lg overflow-hidden aspect-w-1 aspect-h-1 group shadow-md hover:shadow-xl transition-shadow duration-300"
//               >
//                 <img
//                   src={`https://source.unsplash.com/400x400/?${category.imageQuery}`}
//                   alt={category.name}
//                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300" />
//                 <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
//                   <h3 className="text-white text-lg md:text-xl font-semibold tracking-wide drop-shadow-md">
//                     {category.name}
//                   </h3>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works (New Section Example) */}
//       <section className="py-16 md:py-24 bg-muted/20">
//         <div className="container px-4">
//           <div className="text-center mb-12 md:mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//               Ordering is Easy
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Get your favorite food in just 3 simple steps.
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             {[
//               { step: 1, title: "Browse & Select", description: "Explore restaurants and add dishes to your cart." },
//               { step: 2, title: "Checkout Securely", description: "Enter your details and pay with your preferred method." },
//               { step: 3, title: "Enjoy Your Meal", description: "Track your order and get ready for deliciousness!" },
//             ].map(item => (
//               <div key={item.step} className="p-6">
//                 <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-md">
//                   {item.step}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//                 <p className="text-muted-foreground">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 md:py-32 bg-primary text-primary-foreground">
//         <div className="container px-4 text-center">
//           <Sparkles className="h-16 w-16 text-yellow-300 mx-auto mb-6" />
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
//             Hungry? Your Next Meal Awaits!
//           </h2>
//           <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
//             Don't let hunger win. Dive into our menu and let us handle the cooking.
//             Quick, easy, and utterly delicious.
//           </p>
//           <Button asChild size="lg" variant="secondary" className="text-lg px-10 py-7 bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-300 transform hover:scale-105">
//             <Link to="/menu">Find Your Feast</Link>
//           </Button>
//         </div>
//       </section>
//     </div>
//   )
// }

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, UtensilsCrossed, Clock, CreditCard, Sparkles, Star, MessageSquare } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: <UtensilsCrossed className="h-8 w-8 text-primary" />,
      title: "Exquisite Culinary Choices",
      description: "Discover a curated selection of exceptional dishes, crafted by renowned chefs to delight every palate.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Prompt & Dependable Delivery",
      description: "Your meals, delivered with precision and care, ensuring freshness upon arrival right at your doorstep.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Effortless & Secure Transactions",
      description: "Experience a seamless and secure payment process with a variety of convenient options.",
    },
  ]

  const popularCategories = [
    { name: "Artisan Pizza", imageUrl: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpenphfGVufDB8fDB8fHww" },
    { name: "Gourmet Burgers", imageUrl: "https://images.unsplash.com/photo-1702709440966-0602d2e7d9d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhbSUyMGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Fresh Sushi", imageUrl: "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlc2glMjBzdXNoaXxlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Decadent Desserts", imageUrl: "https://images.unsplash.com/photo-1690850076086-67bc05f2963a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRlY2VkYW50JTIwZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D" },
  ]

  const testimonials = [
    {
      quote: "The quality of food and the speed of delivery are unmatched. My go-to for every special occasion!",
      name: "Alex P.",
      location: "New York, USA",
      avatarFallback: "AP",
    },
    {
      quote: "Absolutely love the diverse menu options. It's like a world tour for my taste buds, right from home.",
      name: "Maria S.",
      location: "London, UK",
      avatarFallback: "MS",
    },
    {
      quote: "Seamless ordering and always reliable. The customer service is top-notch too!",
      name: "Kenji T.",
      location: "Tokyo, JP",
      avatarFallback: "KT",
    },
  ]

  return (
    <div className="bg-background text-foreground antialiased">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] md:min-h-[90vh] flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out"
          style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?gourmet-food,fine-dining,bright')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 md:bg-gradient-to-r md:from-black/75 md:via-black/40 md:to-transparent" />
        <div className="container relative z-10 px-4 py-24 md:py-36">
          <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto md:mx-0 md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-xl">
              Extraordinary Flavors, <br /> Effortlessly Delivered.
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-10 leading-relaxed max-w-xl">
              Indulge in a world-class dining experience from the comfort of your home. Order today and taste the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* Ensure this Button has ONLY the Link as a direct child */}
              <Button asChild size="lg" className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-lg transition-all duration-300 transform hover:scale-105">
                <Link to="/menu">Discover Menu</Link>
              </Button>
              {/* Ensure this Button has ONLY the Link as a direct child */}
              <Button asChild variant="outline" size="lg" className="text-lg px-10 py-7 border-white/80 text-white hover:bg-white hover:text-primary rounded-md shadow-lg transition-all duration-300 transform hover:scale-105">
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
              Experience the <span className="text-primary">Difference</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're passionate about delivering not just food, but an exceptional experience from start to finish.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-lg p-8 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
              >
                <div className="mb-6 bg-primary/10 p-4 rounded-full text-primary self-start">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-0 text-foreground">
              Explore Our Collections
            </h2>
            {/* Ensure this Button has ONLY the Link as a direct child */}
            <Button asChild variant="link" className="text-primary hover:text-primary/80 transition-colors text-md px-0">
              <Link to="/menu" className="flex items-center gap-1.5">
                View All Collections <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {popularCategories.map((category) => (
              <Link
                key={category.name}
                to={`/menu?category=${category.name.toLowerCase().replace(" ", "-")}`}
                className="relative rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/5] flex flex-col justify-end"
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />
                <div className="relative z-10 p-5 md:p-6">
                  <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight drop-shadow-lg">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
              Ordering Made Simple
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Enjoy your favorite meals in three easy steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 relative">
            {[
              { step: 1, title: "Discover & Choose", description: "Browse our curated menus and select your desired dishes." },
              { step: 2, title: "Secure Checkout", description: "Provide your details and complete your order with secure payment." },
              { step: 3, title: "Savor Your Meal", description: "Track your delivery and get ready to indulge in culinary excellence." },
            ].map((item) => (
              <div key={item.step} className="relative z-10 bg-card p-8 rounded-lg border border-border/50 shadow-sm text-center flex flex-col items-center">
                <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-md">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16 md:mb-20">
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Hear from those who've experienced our service.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-card p-8 rounded-lg shadow-sm border border-border/50 flex flex-col">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold mr-3">
                    {testimonial.avatarFallback}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-36 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?food-spread,delicious,table')" }}
        />
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
        <div className="container relative z-10 px-4">
          <Sparkles className="h-16 w-16 text-yellow-300 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
            Ready to Taste Perfection?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Your next unforgettable meal is just a few clicks away. Explore our menu and place your order now.
          </p>
          {/* Ensure this Button has ONLY the Link as a direct child */}
          <Button asChild size="lg" variant="secondary" className="text-lg px-12 py-8 bg-white text-primary hover:bg-gray-100 rounded-md shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link to="/menu">Order Your Meal Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}