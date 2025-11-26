-- =========================================================
-- BAGIAN 1: RESET & SCHEMA DATABASE
-- =========================================================

-- 1. Hapus tabel lama (Urutan penting untuk hindari error FK)
DROP TABLE IF EXISTS public.cart_items CASCADE;
DROP TABLE IF EXISTS public.enrollments CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;

-- 2. Aktifkan Ekstensi UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 3. Tabel COURSES (Produk/Kursus)
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  image_url text,
  
  -- Harga & Kategori
  price numeric(10,2) NOT NULL DEFAULT 0,
  discount_price numeric(10,2),
  category text, 
  stars numeric(3,1) DEFAULT 0,
  
  -- Detail Info
  duration text,
  videos_duration text,
  lessons_count integer DEFAULT 0,
  language text,
  skill_level text,
  
  -- Data JSONB (Konten Lengkap)
  overview text,
  curriculum jsonb DEFAULT '[]'::jsonb,
  instructor jsonb DEFAULT '{}'::jsonb,
  reviews jsonb DEFAULT '[]'::jsonb,
  
  created_at timestamptz DEFAULT now()
);
CREATE UNIQUE INDEX idx_courses_slug ON public.courses (slug);

-- 4. Tabel CART_ITEMS (Keranjang Belanja)
CREATE TABLE public.cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  qty int DEFAULT 1, 
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- 5. Tabel ENROLLMENTS (Hak Akses/Milik)
CREATE TABLE public.enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  enrolled_at timestamptz DEFAULT now(),
  status text DEFAULT 'active',
  UNIQUE(user_id, course_id)
);

-- =========================================================
-- BAGIAN 2: KEAMANAN (ROW LEVEL SECURITY)
-- =========================================================

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Policy Cart (Hanya pemilik yang bisa akses)
CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Policy Enrollments (Hanya pemilik yang bisa akses)
CREATE POLICY "Users can view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own enrollments" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);


-- =========================================================
-- BAGIAN 3: ISI DATA DUMMY PREMIUM
-- =========================================================

INSERT INTO public.courses (
  title, slug, image_url, price, discount_price, category, stars, 
  duration, videos_duration, lessons_count, language, skill_level, 
  overview, curriculum, instructor, reviews
) 
VALUES 
-- 1. NODE JS (Andrew Mead)
(
  'The Complete Node.js Developer Course (3rd Edition)',
  'complete-nodejs-developer',
  'https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/nodejs.webp',
  129.00, 19.99, 'Development', 4.8, 
  '35 Hours', '28 Hours', 42, 'English', 'Advanced',
  
  -- Overview
  '<p>This course is the definitive guide to mastering <strong>Node.js</strong>. We will go beyond basic syntax and dive deep into the architecture behind the scenes.</p><p>What you will learn:</p><ul><li>Event Loop & Asynchronous Programming</li><li>Building REST APIs with Express</li><li>NoSQL (MongoDB) and SQL (Postgres) Databases</li><li>Real-time Apps with Socket.io</li><li>Deployment to DigitalOcean & AWS</li></ul><p>Perfect for beginners to intermediate developers aiming for a career in Backend Engineering.</p>',
  
  -- Curriculum
  '[
    {"title": "Module 1: Node.js Fundamentals", "items": ["Introduction & Environment Setup", "The Node REPL", "Global Objects & Modules", "The Process Object", "FileSystem (FS) Module"]}, 
    {"title": "Module 2: Asynchronous Programming", "items": ["Call Stack & Event Loop", "Callback Functions", "Promises & Async/Await", "Handling Errors", "HTTP Requests"]},
    {"title": "Module 3: Express.js Framework", "items": ["Setting up Express Server", "Routing & Middleware", "Serving Static Files", "Template Engines (EJS/Pug)", "MVC Architecture"]},
    {"title": "Module 4: Databases & APIs", "items": ["Connecting to MongoDB", "Mongoose Schema & Models", "RESTful API Design", "Authentication with JWT", "Postman Testing"]}
  ]'::jsonb,
  
  -- Instructor (Avatar: randomm1.png)
  '{
    "name": "Andrew Mead", 
    "position": "Senior Backend Architect", 
    "bio": "A full-stack developer with over 10 years of experience. I have taught over 500,000 students how to code and get hired.", 
    "avatar": "https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/randomm1.png"
  }'::jsonb,
  
  -- Reviews
  '[
    {"user": "Sarah Jenkins", "rating": 5, "comment": "The Event Loop explanation was very visual and easy to understand. The final project helped my portfolio immensely."},
    {"user": "Michael Chen", "rating": 4.5, "comment": "Very technical and deep. A bit fast on the MongoDB part, but the instructor is very responsive in the forum."},
    {"user": "Rudi Tabuti", "rating": 5, "comment": "Finally understood how backend actually works. Worth every penny!"}
  ]'::jsonb
),

-- 2. REACT (Maximilian)
(
  'React - The Complete Guide 2024 (incl Hooks, Next.js)',
  'react-complete-guide',
  'https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/react%20next.webp',
  149.00, 24.99, 'Development', 4.9, 
  '48 Hours', '40 Hours', 65, 'English', 'All Levels',
  
  -- Overview
  '<p>Master <strong>React.js</strong> from the basics to the latest 2024 features. This course covers the modern frontend development ecosystem.</p><h3>Key Topics:</h3><ul><li>React Hooks (useState, useEffect, useContext)</li><li>State Management (Redux Toolkit & Zustand)</li><li>Next.js 14 (App Router, Server Actions)</li><li>Styling (Tailwind CSS & Styled Components)</li></ul>',
  
  -- Curriculum
  '[
    {"title": "Section 1: React Basics", "items": ["Components & JSX", "Props & State", "Handling Events", "Rendering Lists", "Conditional Rendering"]}, 
    {"title": "Section 2: React Hooks Deep Dive", "items": ["useEffect & Lifecycle", "useRef & DOM Access", "useReducer for Complex State", "Custom Hooks", "Performance with useMemo & useCallback"]},
    {"title": "Section 3: Next.js Framework", "items": ["Introduction to Next.js 14", "App Router vs Pages Router", "Server Side Rendering (SSR)", "Static Site Generation (SSG)", "API Routes"]}
  ]'::jsonb,
  
  -- Instructor (Avatar: randomwhite.jpg)
  '{
    "name": "Maximilian Schwarz", 
    "position": "Lead Frontend Engineer", 
    "bio": "Professional Web Developer and Instructor. I create courses to help you become a web development wizard.", 
    "avatar": "https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/randomwhite.jpg"
  }'::jsonb,
  
  -- Reviews
  '[
    {"user": "Jessica Lee", "rating": 5, "comment": "The transition from vanilla React to Next.js was explained seamlessly. Very up-to-date with industry standards."},
    {"user": "David Miller", "rating": 5, "comment": "Loved the explanation on Server Components. Absolutely revolutionary!"}
  ]'::jsonb
),

-- 3. UI/UX (Emily Parker)
(
  'Google UX Design Professional Certificate',
  'google-ux-design',
  'https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/UI%20UX.png',
  89.00, 14.99, 'UI/UX Design', 4.7, 
  '25 Hours', '20 Hours', 30, 'English', 'Beginner',
  
  -- Overview
  '<p>Don’t just design pretty pictures, design <strong>experiences</strong>. This course teaches the Design Thinking process from empathy to testing.</p><p>Tools used: <strong>Figma & FigJam</strong>.</p><ul><li>User Research & Personas</li><li>Wireframing (Low-fi)</li><li>Visual Design & Typography</li><li>Prototyping & Animation</li><li>Usability Testing</li></ul>',
  
  -- Curriculum
  '[
    {"title": "Phase 1: Empathize & Define", "items": ["What is UX?", "User Research Methods", "Creating User Personas", "User Journey Maps", "Competitive Audit"]}, 
    {"title": "Phase 2: Ideate & Wireframe", "items": ["Sketching Ideas (Crazy 8s)", "Information Architecture", "Low-Fidelity Wireframes", "Grid Systems", "Layout Principles"]},
    {"title": "Phase 3: Prototype & Test", "items": ["High-Fidelity Design in Figma", "Interactive Components", "Smart Animate", "Conducting Usability Studies", "Design Handoff"]}
  ]'::jsonb,
  
  -- Instructor (Avatar: randomw1.jpeg)
  '{
    "name": "Emily Parker", 
    "position": "Product Designer at Google", 
    "bio": "Passionate about creating intuitive and accessible digital experiences. 8 years of experience in Silicon Valley.", 
    "avatar": "https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/randomw1.jpeg"
  }'::jsonb,
  
  -- Reviews
  '[
    {"user": "Rina Kartika", "rating": 4.8, "comment": "Learned a lot about auto-layout in Figma. Saved me so much work time."},
    {"user": "John Doe", "rating": 5, "comment": "The research material is very strong. Not just a tool tutorial, but a mindset tutorial."}
  ]'::jsonb
),

-- 4. DIGITAL MARKETING (Rob Percival)
(
  'The Complete Digital Marketing Course - 12 Courses in 1',
  'digital-marketing-masterclass',
  'https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/digital%20marketing.webp',
  99.00, 12.99, 'Digital Marketing', 4.6, 
  '22 Hours', '18 Hours', 35, 'English', 'Beginner',
  
  -- Overview
  '<p>A complete guide to dominating the digital market. Learn measurable and data-driven marketing strategies.</p><h3>Coverage:</h3><ul><li>Search Engine Optimization (SEO)</li><li>Google Ads (SEM)</li><li>Social Media Marketing (IG, TikTok, LinkedIn)</li><li>Email Marketing & Copywriting</li><li>Google Analytics 4</li></ul>',
  
  -- Curriculum
  '[
    {"title": "Module 1: Market Research & Strategy", "items": ["Defining Target Audience", "Buyer Persona", "USP & Value Proposition", "Competitor Analysis"]}, 
    {"title": "Module 2: SEO Mastery", "items": ["Keyword Research", "On-Page Optimization", "Technical SEO", "Link Building Strategies", "Local SEO"]},
    {"title": "Module 3: Paid Advertising", "items": ["Facebook & Instagram Ads Manager", "Google Search Ads", "Retargeting Strategies", "Budgeting & ROAS"]}
  ]'::jsonb,
  
  -- Instructor (Avatar: baldman.jpg)
  '{
    "name": "Rob Percival", 
    "position": "Digital Marketing Expert", 
    "bio": "Helping businesses grow through data-driven marketing strategies. Founder of two digital agencies.", 
    "avatar": "https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/baldman.jpg"
  }'::jsonb,
  
  -- Reviews
  '[
    {"user": "Budi Santoso", "rating": 4, "comment": "The SEO tips immediately impacted my office website traffic."},
    {"user": "Lisa Wong", "rating": 5, "comment": "The Facebook Ads module is very detailed, from pixel setup to campaign scaling."}
  ]'::jsonb
),

-- 5. VIDEO EDITING (Phil Ebiner)
(
  'Adobe Premiere Pro CC: Video Editing for Beginners',
  'premiere-pro-editing',
  'https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/ikanhiu.webp',
  64.00, NULL, 'Video Editing', 4.9, 
  '12 Hours', '10 Hours', 20, 'English', 'Beginner',
  
  -- Overview
  '<p>Transform raw footage into cinematic masterpieces. This course focuses on using <strong>DaVinci Resolve</strong>, the Hollywood standard software.</p><ul><li>Professional Editing Workflow</li><li>Color Correction & Grading</li><li>Audio Mixing & Sound Design</li><li>Fusion (Basic VFX)</li></ul>',
  
  -- Curriculum
  '[
    {"title": "Chapter 1: The Basics", "items": ["Understanding Interface", "Importing Footage", "The Cut Page Workflow", "Basic Trimming"]}, 
    {"title": "Chapter 2: Advanced Editing", "items": ["The Edit Page Deep Dive", "Transitions & Effects", "Keyframing & Animation", "Speed Ramping"]},
    {"title": "Chapter 3: Color & Audio", "items": ["Reading Scopes", "Primary Color Wheels", "Secondary Correction", "Fairlight Audio Tab", "Exporting"]}
  ]'::jsonb,
  
  -- Instructor (Avatar: randomm2.webp)
  '{
    "name": "Phil Ebiner", 
    "position": "Professional Filmmaker", 
    "bio": "Top-rated instructor with over 2 million students. I teach creative skills to help you succeed.", 
    "avatar": "https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/randomm2.webp"
  }'::jsonb,
  
  -- Reviews
  '[
    {"user": "Siti Nurhaliza", "rating": 5, "comment": "Finally moved from Premiere to DaVinci. The color grading is on another level!"},
    {"user": "Tom Cruise", "rating": 5, "comment": "Straight to the point tutorials. No fluff."}
  ]'::jsonb
),

-- 6. PRODUCTIVITY (Ali Abdaal)
(
  'Productivity Masterclass: Principles and Tools',
  'productivity-mastery',
  'https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/produktif.webp',
  45.00, NULL, 'Self Improvement', 4.8, 
  '5 Hours', '5 Hours', 12, 'English', 'All Levels',
  
  -- Overview
  '<p>Feeling busy but not productive? This course debunks productivity myths and provides actionable systems.</p><h3>Systems taught:</h3><ul><li>Getting Things Done (GTD)</li><li>Second Brain (Notion/Obsidian)</li><li>Time Blocking & Deep Work</li></ul>',
  
  -- Curriculum
  '[
    {"title": "Part 1: The Psychology", "items": ["Why We Procrastinate", "The Dopamine Detox", "Flow State", "Energy Management"]}, 
    {"title": "Part 2: The Systems", "items": ["Inbox Zero Method", "The PARAM Method", "Daily Highlight", "Weekly Review"]},
    {"title": "Part 3: Tools of Titans", "items": ["Notion Setup", "Calendar Hacks", "Email Automation", "Keyboard Shortcuts"]}
  ]'::jsonb,
  
  -- Instructor (Avatar: blackwoman.jpg)
  '{
    "name": "Ali Abdaal", 
    "position": "Doctor & YouTuber", 
    "bio": "I explore the evidence-based strategies and tools that help us live happier, healthier, and more productive lives.", 
    "avatar": "https://lzrhjvjisxjtggmthkps.supabase.co/storage/v1/object/public/course-images/blackwoman.jpg"
  }'::jsonb,
  
  -- Reviews
  '[
    {"user": "Doni Tata", "rating": 5, "comment": "Life changing. I now work less but achieve more."},
    {"user": "Maria", "rating": 4.5, "comment": "The Second Brain concept really helped me organize my ideas."}
  ]'::jsonb
);