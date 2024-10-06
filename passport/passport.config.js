
/* --- Passport Configuration (passport.config.js) --- */
/* 
This file configures Passport.js to handle user login and authentication.
It defines how Passport stores (serializes) user data into the session and how it retrieves (deserializes) it from the session.

* This is equivalent to "Authentication" in JWT.(meaning it's a "LoginYeah, but this is not a synthesization. This is authorization Hey Cortana Text her back. Here's my first language, but when I was my first language, but when I started elementary school, I spoke on That's exactly yes. Let's see if random people can spot the difference. Hey Cortana OK say what? ohh my God. I got you. Do you remember Mr bro Mr Beast's brothers? Right away. Let's write the new primex right away. I love the bottles. I really like it. It's like. I really like it. It's like the best. I mean, the best thing I've ever had, probably just don't buy it. It's exactly like a strawberry lemonade. I would probably give it a. 8.4. truck. It's like a 9. Let's write My name is CJ I'm Mr Beast's unknown brother, and we're gonna see what happens. So I used to work at Walmart Downtown rock and slash races pass Make a voice downtown. Sports names everyday. so it keeps them down in this My name is Mandy tomorrow my daughter. Select. To recognize a procrastinator, he can't get things done. His day depends on his motivation. Hello and welcome to the channel. projects that are you can get a job as an enterprise level software engineer in this course. We are going to be building and launching our very own food ordering platform. You'll be able to add to your portfolio to impress employers. Feel free to jump to the devil. Hey everyone, I'm excited to share with you this full stack tutorial that I've been working on where we basically build out Google Drive Mini Club. So I'm going to walk through all the features and show you what I built and then you can watch the term tutorial and see how I built this. So if we go ahead and just click and get started, we don't have an account yet. So that will ask us to create 1 1. I'll go ahead and sign it again. We are using clerk or authentication, which is 1 of the sponsors of this video. I'm also using convex for the back end as a service. I like both of the services a lot to really help you build faster and I will Tell me about something I speak here is not a typical CPU Lo, not a huge problem, but it's annoying. Plus, you can make sense of it right away. It's not just a black book. Take a little headed back to one that's been planted over here by hostile force. State sponsored hackers. Now it's set to spread globally. Give the perpetrators access to millions of servers around the world. To the systems of hospitals, companies and entire government and master key to the Internet and everything connected to it right in the hands of criminals Address doesn't know about any of this yet, but he's about to literally save the Internet. Fundamental. infrastructure. Well, anyone can pitch in open source projects. They are usually few people in church. These so called maintainers and the final say of the code and review any changes before they get implemented. That's a call. It's one of these maintainers. He's been working for years of the Linux executives, Linux operating system world. You may not be running directly on your own computer, but it powers most of the word servers, mainframes and every single 1. 500 computers. Linux distribution is like a full package of all the essential programs your computer needs to run. Different districts are designed for different purposes. Packages, data so it can be transferred I'm gonna need your name. ")
*/

import passport from "passport";
import bcrypt from "bcryptjs"; // A library for hashing passwords (for security).

import { User } from "../models/user.model.js"; // Your MongoDB user model.
import { GraphQLLocalStrategy } from "graphql-passport"; // A GraphQL strategy for authenticating users.

export const configurePassport = async () => {
	// "Serializing" means storing some user data in the session (in this case, the user ID).
	passport.serializeUser((user, done) => {
		done(null, user.id); // Store the user ID in the session.
	});

	// "Deserializing" means retrieving the user data from the session using the ID.
	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findById(id); // Find the user by their ID.
			done(null, user); // Pass the user object back.
		} catch (err) {
			done(err); // Handle any errors that occur.
		}
	});

	// This strategy checks the user's credentials (username and password) during login.
	passport.use( // Local strategy for authenticating users with a username and password.(our Login functionality)
		new GraphQLLocalStrategy(async (username, password, done) => {
			try {
				const user = await User.findOne({ username }); // Look for the user in the database.
				if (!user) {
					throw new Error("Invalid username or password");
				}
				const validPassword = await bcrypt.compare(password, user.password); // Compare passwords.
				if (!validPassword) {
					throw new Error("Invalid username or password");
				}
				return done(null, user); // If valid, return the user object.
			} catch (err) {
				return done(err); // Handle errors.
			}
		})
	);
};