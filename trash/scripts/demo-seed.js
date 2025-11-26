/**
 * Demo seeding script
 * Usage: set environment variables (see .env.local.example), then run:
 *   node scripts/demo-seed.js
 *
 * This script inserts sample profiles, courses and a cart item for demo/testing.
 */

import supabaseAdmin from '../lib/supabaseServerClient'

async function run() {
  try {
    console.log('Inserting demo profile...')
    const profile = {
      id: '11111111-1111-1111-1111-111111111111', // fixed id for demo
      full_name: 'Demo User',
      avatar_url: null,
      role: 'student'
    }

    await supabaseAdmin.from('profiles').upsert(profile)

    console.log('Inserting demo courses...')
    const GLOBAL_IMAGE = 'https://drive.google.com/uc?export=view&id=1uNgVcJcVdH0XGEymUekukJ_pRo0YxrWd'

    const courses = [
      {
        id: '22222222-2222-2222-2222-222222222222',
        title: 'Demo: Intro to Node',
        slug: 'demo-intro-node',
        description: 'A short demo course about Node.js',
        price: 19.99,
        discount: 0,
        image_url: GLOBAL_IMAGE,
        metadata: { instructor_name: 'Rafi', rating: 4.5, students: 12, lessons: 8 }
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        title: 'Demo: React Basics',
        slug: 'demo-react-basics',
        description: 'A short demo course about React',
        price: 29.99,
        discount: 10,
        image_url: GLOBAL_IMAGE,
        metadata: { instructor_name: 'Rafi', rating: 4.8, students: 30, lessons: 12 }
      }
      ,
      {
        id: '44444444-4444-4444-4444-444444444444',
        title: 'Demo: Vue Essentials',
        slug: 'demo-vue-essentials',
        description: 'A short demo course about Vue.js essentials',
        price: 24.99,
        discount: 5,
        image_url: GLOBAL_IMAGE,
        metadata: { instructor_name: 'Rafi', rating: 4.6, students: 18, lessons: 10 }
      }
    ]

    const { error: errCourses } = await supabaseAdmin.from('courses').upsert(courses)
    if (errCourses) throw errCourses

    console.log('Inserting demo cart item for demo user...')
    const cartItem = {
      user_id: profile.id,
      course_id: courses[0].id,
      qty: 1,
      selected_meta: {}
    }

    const { error: errCart } = await supabaseAdmin.from('cart_items').upsert(cartItem, { onConflict: ['user_id','course_id'] })
    if (errCart) throw errCart

    console.log('Demo data inserted successfully.')
    console.log('Profile id:', profile.id)
    console.log('Course slugs:', courses.map(c => c.slug).join(', '))
    process.exit(0)
  } catch (err) {
    console.error('Seeding error:', err)
    process.exit(1)
  }
}

run()
