// images for courses
import cimg1 from '/public/images/popular/img-1.jpg'
import cimg2 from '/public/images/popular/img-2.jpg'
import cimg3 from '/public/images/popular/img-3.jpg'
import timg1 from '/public/images/team/1.jpg'
import timg2 from '/public/images/team/2.jpg'
import timg3 from '/public/images/team/3.jpg'
import timg4 from '/public/images/team/4.jpg'

import cSimg1 from '/public/images/popular/popular-single/img-1.jpg'
import cSimg2 from '/public/images/popular/popular-single/img-2.jpg'
import cSimg3 from '/public/images/popular/popular-single/img-3.jpg'


const Courses = [
   {
      Id: '1',
      category: 'Development',
      cImg: cimg1,
      cSImg: cSimg1,
      author:timg1,
      authorName: 'Jenny Wilson',
      authortitle:'Graphic Designer',
      lesson:'20',
      lessons_count: 20,
      instructor: { name: 'Jenny Wilson', avatar: timg1 },
      fee: '80',
      student:'200',
      ratting:'4.5',
      title: 'Learn WordPress & Elementor for Beginners',
      slug: 'Learn-WordPress-&-Elementor-for-Beginners',
      description: 'We are providing you the best UI/UX design guideline. That help you be professional.',
   },
   {
      Id: '2',
      category: 'Graphic-Design',
      cImg: cimg2,
      cSImg: cSimg2,
      author:timg2,
      authorName: 'Darren Lane',
      authortitle:'UX Designer',
      lesson:'30',
      lessons_count: 30,
      instructor: { name: 'Darren Lane', avatar: timg2 },
      fee: '100',
      student:'420',
      ratting:'5.0',
      title: 'The Complete Guide to Be a Graphics Designer.',
      slug: 'The-Complete-Guide-to-Be-a-Graphics-Designer',
      description: 'We are providing you the best Digital Marketing guideline. That help you be professional. '
   },
   {
      Id: '3',
      category: 'Self-Improvement',
      cImg: cimg3,
      cSImg: cSimg3,
      author:timg3,
      authorName: 'Courtney Henry',
      authortitle:'Senior Marketer',
      lesson:'25',
      lessons_count: 25,
      instructor: { name: 'Courtney Henry', avatar: timg3 },
      fee: '90',
      student:'300',
      ratting:'4.8',
      title: 'Learning How To Write As A Professional Author',
      slug: 'Learning-How-To-Write-As-A-Professional-Author',
      description: 'We are providing you the best Development guideline. That help you be professional.'
   },
   // other courses removed per user request
]

export default Courses;