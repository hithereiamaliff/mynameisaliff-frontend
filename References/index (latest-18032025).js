require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const rateLimit = require('express-rate-limit');

const app = express();

// Enable trust proxy BEFORE any other middleware or route setup
app.set('trust proxy', 1);

const port = process.env.PORT || 3001;

// Debug: Log all environment variables (remove in production)
console.log('Environment variables check:', {
  port,
  clientUrl: process.env.CLIENT_URL,
  hasOpenAIKey: !!process.env.YOUR_KEY_HERE,
  openAIKeyLength: process.env.YOUR_KEY_HERE?.length
});

// Enhanced security middleware
app.use(cors({
  origin: ['http://localhost:5173', process.env.CLIENT_URL], // Allow both local and production URLs
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

// Rate limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());

// Secure OpenAI client
const openai = new OpenAI({
  apiKey: "YOUR_OPENAI_KEY_HERE"});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Protected chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    console.log('Starting chat endpoint...');
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid request format:', { messages });
      return res.status(400).json({ error: 'Invalid request format' });
    }

    console.log('Received chat request:', { 
      messages,
      messageCount: messages.length,
      firstMessage: messages[0]?.content
    });

    // Hardcoded content about YourName
    const YourNameContent = `Name: YourName
Location: George Town, Penang, Malaysia
LinkedIn: https://www.linkedin.com/in/hithereiamYourName
Website: https://your-website-name.co.uk
Portfolio/Previous Works: https://alancopywritingservices.com/written-content
Main Language Spoken: Malay, English, Thai (albeit just conversational level, elementary level)

Summary:
A passionate soon-to-be licensed tour guide in Penang with over five years of experience in SEO, digital content creation, and inbound marketing across multiple industries. Brings a unique blend of content marketing expertise and first-hand experience as a Penang local to showcase Penang's rich cultural heritage, local public transportation, and payment tech in an unforgettable way.

Experience:
- Founder, Licensed Tour Guide-in-Training at Tour With Alan (October 2024 - Present)
  * Currently pursuing a licensed tour guide certification from MOTAC through SENTRAL College Penang since October 2024
  * Enhancing content marketing skills and latest technology adoption for Penang tourism promotion
  * Planning to leverage local public transportation and cashless experiences
  * Will get the tour guide license by end-2025
  * Note: Not offering packaged tours yet

- Founder, Content Writer & Blogger at Alan Copywriting Services (June 2019 – Present)
  * Produced over 220 high-quality, SEO-optimized articles and 400 actionable content briefs
  * Created content marketing collateral including white papers, eBooks, case studies, and infographics
  * Revamped web page copy for small business websites in Malaysia
  * Managed remote client relationships using various tools
  * Collaborated with leading brands like Frase, Häfele, and Boutir

- Content Marketing cum Relationship Associate at Boutir (September 2021 - February 2022)
  * Understood customer segmentation and behavior
  * Created content for various online marketing channels
  * Achieved significant engagement on Facebook ads

- Content Marketing Executive at Evolve & Adapt (March 2022 - August 2022)
  * Performed research for One Eye Deer's weekly podcast content
  * Edited audio and managed podcast files
  * Grew podcast downloads to over 2,000

- Freelance Writer at Upscale (November 2021 - Present)
  * Authored over 100 high-quality blog articles
  * Refined on-page SEO elements
  * Produced website copy and social media content

- Content Creator at Frase, Inc (May 2022 - Present)
  * Developed over 400 detailed content briefs
  * Collated relevant research and information

- Freelance Writer at Salt Tech Solutions (September 2021 - March 2023)
  * Produced over 28 short blog articles
  * Optimized website content for SEO
  * Proofread marketing materials

- Freelance Writer at Hafele Malaysia (November 2021 - January 2022)
  * Created 5 engaging Facebook Ads per week
  * Planned Facebook post content topics monthly
  * Proofread written and design materials

- Website Manager at Getting It Strait (May 2021 - April 2024)
  * Managed web development and maintenance
  * Optimized content for SEO
  * Migrated website from Wordpress.com to self-hosted WordPress
  * Improved website performance

- Community Volunteer at Moovit (February 2019 – Present)
  * Contributed and edited public transport routes and timetables
  * Ensured accuracy of transport data for various services

Projects:
- Speed Up Website Performance for Seamless User Experience (May 2021)
  * Improved website performance by 40%
- WordPress Website Migration (June 2021)
  * Led website migration in under 24 hours
  * Enabled full WordPress customization

Certifications:
- The Fundamentals of Digital Marketing - Google Digital Garage (November 2020)
- Content Marketing Certification - HubSpot Academy (December 2020)
- Inbound Marketing Certification - HubSpot Academy (2021)
- TESOL Certificate - myTESOL (November 2018)
- Certified Competent Manager (HIT3129) - Alpha International Training & Consultancy (2021)

Skills:
Content & Digital Marketing:
- Content Marketing
- SEO & Technical SEO
- Inbound Marketing
- Copywriting
- Digital Marketing
- Blog & Article Writing
- Market Research

Tourism & Tour Guiding:
- Tour Planning & Management
- Tourism Marketing
- Travel & Tourism

Education:
- Bachelor of English Studies (BEST) from Open University Malaysia (Graduated August 2021)

Note: For the complete, up-to-date CV, please use the Download CV button.`;

    // Prepare system message with the information
    console.log('Preparing system message with YourName\'s information...');
    const systemMessage = {
      role: "system",
      content: `You are YourName's friendly and professional AI assistant. Answer questions based on the following information about YourName.
Be conversational and natural in your responses.
When discussing Penang, focus on its beauty and charm rather than cultural heritage.

For contact information (phone, email):
- Always direct users to download the CV using the "Download CV" button

For LinkedIn requests:
- Direct users to click the LinkedIn button in the "Let's Connect" section at the bottom of the page

For other social media inquiries:
- Inform users that YourName only maintains a LinkedIn presence at this time

For job vacancies or offers:
- When users mention job opportunities, ask them to share the details in the chat
- Request specific information: role, company, location, and requirements
- If they ask about uploading files, inform them that file uploads or analyzing links/URLs are not supported at the moment, and kindly ask them to paste the job details directly in the chat
- Do not ask the user to share their application link in the chat, as the chatbot won't be able to relay the links to YourName. Instead, redirect the user to connect on LinkedIn and share their job vacancy details from there.

For general questions:
- Share information from the provided content freely when relevant
- Only suggest downloading the CV if the user needs the formal document
- If asked about something not covered in the provided information, politely explain that you don't have that specific information.
- If the user asks if YourName knows about Rapid Penang or Penang bus network or public transport in Penang, direct the user to go to the Rapid Penang Chatbot web app at https://pgbusapp.your-website-name.co.uk/ to get the latest information about Penang public transport. Do note that the generated response is based on my own knowledge and experience taking Rapid Penang buses frequently.
- DO NOT answer questions about Penang public transport or give recommendations about which routes or times to take. Again, direct users to the Rapid Penang Chatbot web app if they ask so.

Information about YourName:
${YourNameContent}`
    };

    // Add system message to the beginning of messages array
    const messagesWithSystem = [systemMessage, ...messages];

    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: messagesWithSystem,
      max_tokens: 1000,
      temperature: 0.7,
    });
    
    console.log('Successfully received response from OpenAI');
    res.json(completion.choices[0].message);
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name
    });
    res.status(500).json({ 
      error: 'AI service unavailable',
      message: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    code: err.code,
    name: err.name
  });
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

app.listen(port, () => {
  console.log(`🔒 Secure backend running on port ${port}`);
}); 

