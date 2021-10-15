<template>
  <section class="course-wizard online-course-details">
    <div class="page-header">
      <h3>{{ filteredProgram.DisplayName }}</h3>
      <p class="course-subhead">{{ filteredProgram.ShortDesc }}</p>
    </div>
    <section class="details-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="details-info">
              <h6>About this Program</h6>
              <p>
                {{ filteredProgram.About }}
              </p>
              <h6 class="mt40">Courses Offered</h6>
              <ul class="list-style-type-disc list-col-3">
                <li
                  v-for="(item, index) in filteredProgram.Courses"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
              <h6 class="mt40">
                What You’ll Get
              </h6>
              <ul class="list-style-type-check list-col-2 ml-20">
                <li
                  v-for="(item, index) in filteredProgram.Features"
                  :key="index"
                >
                 {{ item }}
                </li>
              </ul>

              <!-- <ul class="list-style-type-check list-col-2">
                      <li>
                        <span
                          >Scheduled Live Lectures on LMS including Question
                          Answer Sessions</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed video lectures on every topic delivered by
                          experienced faculty members from head office</span
                        >
                      </li>
                      <li>
                        <span
                          >Search engine by which reading notes and video
                          lectures of desired topics can be searched at any
                          time</span
                        >
                      </li>
                      <li>
                        <span
                          >MCQs based quizzes, topic wise and chapter wise, with
                          their prompt system generated results and
                          explanations</span
                        >
                      </li>
                      <li>
                        <span
                          >Progress Reports for Course Completion, Subject wise
                          completion, graphs for Quizzes and Assignments and
                          much more</span
                        >
                      </li>
                      <li>
                        <span
                          >Centralized notifications shared on regular basis
                          related to board exams, changes in policies and
                          announcements by universities and much more</span
                        >
                      </li>
                      <li>
                        <span
                          >Subject wise orientation lectures delivered by
                          Subject HODs</span
                        >
                      </li>
                      <li>
                        <span
                          >Reading notes arranged as per topics in SOS with
                          comprehensive details</span
                        >
                      </li>
                      <li>
                        <span
                          >Online Teacher Support in which students can put
                          their queries and get on the spot response</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed assignments and subjective tests with their
                          results provided on LMS after checking by the
                          teachers</span
                        >
                      </li>
                      <li>
                        <span
                          >Leaderboard indicating the position of a student
                          among the top 20 students enrolled in that
                          session</span
                        >
                      </li>
                    </ul> -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--
    <div v-if="Programs == '10th'">
      <div class="page-header">
        <h3>10th</h3>
        <p class="course-subhead">Boost up your skill</p>
      </div>
      <section class="details-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="details-info">
                <h6 class="details-info-head">About this course</h6>
                <p>
                  Coaching sessions for 10th class are regularly offered at all
                  KIPS campuses for Punjab, KPK, Federal and AJK Boards. In
                  these sessions, our teachers focus on building strong
                  foundations for the preparation of 10th class board exams.
                  <br />KIPS covers its regular coaching courses well in time
                  and then offers Revision and Test sessions. These sessions,
                  consisting of lectures, discussions, and tests on the pattern
                  of Board exams, are a chance for students from KIPS as well as
                  other institutions to make up for any short comings in their
                  preparation for 10th class board exams.
                </p>

                <h6 class="details-info-head mb10">Courses offered</h6>
                <ul class="list-style-type-disc list-col-3">
                  <li>10th Regular</li>
                  <li>10th R&T (Revision & Test)</li>
                </ul>
                  <h6 class="col-md-12 details-info-head mb10">
                    What You’ll Get
                  </h6>
                 
                    <ul class="list-style-type-check list-col-2">
                      <li>
                        <span
                          >Scheduled Live Lectures on LMS including Question
                          Answer Sessions</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed video lectures on every topic delivered by
                          experienced faculty members from head office</span
                        >
                      </li>
                      <li>
                        <span
                          >Search engine by which reading notes and video
                          lectures of desired topics can be searched at any
                          time</span
                        >
                      </li>
                      <li>
                        <span
                          >MCQs based quizzes, topic wise and chapter wise, with
                          their prompt system generated results and
                          explanations</span
                        >
                      </li>
                      <li>
                        <span
                          >Progress Reports for Course Completion, Subject wise
                          completion, graphs for Quizzes and Assignments and
                          much more</span
                        >
                      </li>
                      <li>
                        <span
                          >Centralized notifications shared on regular basis
                          related to board exams, changes in policies and
                          announcements by universities and much more</span
                        >
                      </li>
                      <li>
                        <span
                          >Subject wise orientation lectures delivered by
                          Subject HODs</span
                        >
                      </li>
                      <li>
                        <span
                          >Reading notes arranged as per topics in SOS with
                          comprehensive details</span
                        >
                      </li>
                      <li>
                        <span
                          >Online Teacher Support in which students can put
                          their queries and get on the spot response</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed assignments and subjective tests with their
                          results provided on LMS after checking by the
                          teachers</span
                        >
                      </li>
                      <li>
                        <span
                          >Leaderboard indicating the position of a student
                          among the top 20 students enrolled in that
                          session</span
                        >
                      </li>
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="Programs == 'o-level'">
      <div class="course-head">
        <div class="container div-vertical-horizontal-center">
          <div class="row">
            <div class="col-md-7">
              <h3>O Level</h3>
            </div>
          </div>
        </div>
      </div>
      <section class="details-section">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <div class="details-info">
                <div class="details-info-head">O Level</div>
                <p>
                  10 ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur.
                </p>
              </div>

              <div class="details-info">
                <div class="details-info-head">What you’ll learn</div>
                <div class="row">
                  <div class="col-md-6">
                    <p>
                      <i class="fal fa-check"></i>
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>

                  <div class="col-md-6">
                    <p>
                      <i class="fal fa-check"></i>
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>

                  <div class="col-md-6">
                    <p>
                      <i class="fal fa-check"></i>
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>

                  <div class="col-md-6">
                    <p>
                      <i class="fal fa-check"></i>
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div> 
    <div v-if="Programs == '1st-year'">
      <div class="page-header">
        <h3>1st Year</h3>
        <p class="course-subhead">Towards a bright future</p>
      </div>
      <section class="details-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="details-info">
                <h6 class="details-info-head">About this course</h6>
                <p>
                  The 1st year regular session at KIPS aims at building strong
                  foundations and concepts of students to prepare them for F.Sc.
                  Pre-Medical and Pre-Engineering board exams.
                  <br />Pre-1st year coaching sessions start right after the
                  completion of 10th class board exams, thus providing students
                  with ample time for a thorough preparation. <br />The Revision
                  and Test session, consisting of lectures, discussions, and
                  tests on the pattern of board exams, is a chance for students
                  from KIPS as well as other institutions to make up for any
                  short comings in their preparation for F.Sc. board exams.
                </p>

                <h6 class="details-info-head mb10">Courses offered</h6>
                <ul class="list-style-type-disc list-col-3">
                  <li>Pre 1st Year</li>
                  <li>1st Year Regular</li>
                  <li>1st Year R&T (Revision & Test)</li>
                </ul>
              
                  <h6 class="col-md-12 details-info-head mb10">
                    What You’ll Get
                  </h6>
                  
                    <ul class="list-style-type-check list-col-2">
                      <li>
                        <span
                          >Scheduled Live Lectures on LMS including Question
                          Answer Sessions</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed video lectures on every topic delivered by
                          experienced faculty members from head office</span
                        >
                      </li>
                      <li>
                        <span
                          >Search engine by which reading notes and video
                          lectures of desired topics can be searched at any
                          time</span
                        >
                      </li>
                      <li>
                        <span
                          >MCQs based quizzes, topic wise and chapter wise, with
                          their prompt system generated results and
                          explanations</span
                        >
                      </li>
                      <li>
                        <span
                          >Progress Reports for Course Completion, Subject wise
                          completion, graphs for Quizzes and Assignments and
                          much more</span
                        >
                      </li>
                      <li>
                        <span
                          >Centralized notifications shared on regular basis
                          related to board exams, changes in policies and
                          announcements by universities and much more</span
                        >
                      </li>
                      <li>
                        <span
                          >Subject wise orientation lectures delivered by
                          Subject HODs</span
                        >
                      </li>
                      <li>
                        <span
                          >Reading notes arranged as per topics in SOS with
                          comprehensive details</span
                        >
                      </li>
                      <li>
                        <span
                          >Online Teacher Support in which students can put
                          their queries and get on the spot response</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed assignments and subjective tests with their
                          results provided on LMS after checking by the
                          teachers</span
                        >
                      </li>
                      <li>
                        <span
                          >Leaderboard indicating the position of a student
                          among the top 20 students enrolled in that
                          session</span
                        >
                      </li>
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="Programs == '2nd-year'">
      <div class="page-header">
        <h3>2nd Year</h3>
        <p class="course-subhead">Vitalize your virtuosity</p>
      </div>
      <section class="details-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="details-info">
                <h6 class="details-info-head">About this course</h6>
                <p>
                  The 2nd year regular session at KIPS aims at building strong
                  foundations and concepts of students to prepare them for F.Sc.
                  Pre-Medical and Pre-Engineering board exams.
                  <br />The Revision and Test session, consisting of lectures,
                  discussions, and tests on the pattern of board exams, is a
                  chance for students from KIPS as well as other institutions to
                  make up for any short comings in their preparation for F.Sc.
                  board exams
                </p>

                <h6 class="details-info-head mb10">Courses offered</h6>
                <ul class="list-style-type-disc list-col-3">
                  <li>2nd Year Regular</li>
                  <li>2nd Year R&T (Revision & Test)</li>
                </ul>
              
                  <h6 class="col-md-12 details-info-head mb10">
                    What You’ll Get
                  </h6>
          
                    <ul class="list-style-type-check list-col-2">
                      <li>
                        <span
                          >Scheduled Live Lectures on LMS including Question
                          Answer Sessions</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed video lectures on every topic delivered by
                          experienced faculty members from head office</span
                        >
                      </li>
                      <li>
                        <span
                          >Search engine by which reading notes and video
                          lectures of desired topics can be searched at any
                          time</span
                        >
                      </li>
                      <li>
                        <span
                          >MCQs based quizzes, topic wise and chapter wise, with
                          their prompt system generated results and
                          explanations</span
                        >
                      </li>
                      <li>
                        <span
                          >Progress Reports for Course Completion, Subject wise
                          completion, graphs for Quizzes and Assignments and
                          much more</span
                        >
                      </li>
                      <li>
                        <span
                          >Centralized notifications shared on regular basis
                          related to board exams, changes in policies and
                          announcements by universities and much more</span
                        >
                      </li>
                    
                  
                      <li>
                        <span
                          >Subject wise orientation lectures delivered by
                          Subject HODs</span
                        >
                      </li>
                      <li>
                        <span
                          >Reading notes arranged as per topics in SOS with
                          comprehensive details</span
                        >
                      </li>
                      <li>
                        <span
                          >Online Teacher Support in which students can put
                          their queries and get on the spot response</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed assignments and subjective tests with their
                          results provided on LMS after checking by the
                          teachers</span
                        >
                      </li>
                      <li>
                        <span
                          >Leaderboard indicating the position of a student
                          among the top 20 students enrolled in that
                          session</span
                        >
                      </li>
                    </ul>
                  
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="Programs == 'a-level'">
      <div class="course-head">
        <div class="container div-vertical-horizontal-center">
          <div class="row">
            <div class="col-md-7">
              <h3>A Level</h3>
            </div>
          </div>
        </div>
      </div>
      <section class="details-section">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <div class="details-info">
                <div class="details-info-head">A Level</div>
                <p>
                  10 ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur.
                </p>
              </div>

              <div class="details-info">
                <div class="details-info-head">What you’ll learn</div>
                <div class="row">
                  <div class="col-md-6">
                    <p>
                      <i class="fal fa-check"></i>
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>

                  <div class="col-md-6">
                    <p>
                      <i class="fal fa-check"></i>
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>

                  <div class="col-md-6">
                    <p>
                      <i class="fal fa-check"></i>
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>

                  <div class="col-md-6">
                    <p>
                      <i class="fal fa-check"></i>
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div> 

    <div v-if="Programs == 'medical'">
      <div class="page-header">
        <h3>Medical</h3>
        <p class="course-subhead">Doctoring your career</p>
      </div>
      <section class="details-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="details-info">
                <h6 class="details-info-head">About this course</h6>
                <p>
                  KIPS offers multiple sessions for the preparation of MDCAT
                  (Entrance Test of Public & Private Sector Medical Colleges of
                  Punjab), AKU Entrance test, NUMS (Entrance test for Federal
                  Medical & Dental College, CMH Medical and Dental Colleges,
                  NUMS University and Army Medical College) , ETEA (Entrance
                  Test of Public Sector Medical Colleges of KPK), and SET (State
                  Entry Test for AJK).
                  <br />The Earlier Prep session has been designed exclusively
                  for FSC improvers. The Parallel Prep session, offered on
                  weekends (Saturdays & Sundays), consists of Classes (Lectures,
                  Tests, Discussions/ Follow-up Lectures), parallel to the
                  schedule of R & T Sessions of F.Sc. Pre-Medical 2nd Year
                  Students of Punjab & Federal Board.
                </p>

                <h6 class="details-info-head mb10">Courses offered</h6>
                <ul class="list-style-type-disc list-col-3">
                  <li>MDCAT Plus</li>
                  <li>LMDCAT Plus (UHS Exclusive)</li>
                  <li>LMDCAT Plus (with FCNA)</li>
                  <li>AKU Plus</li>
                  <li>NUMS Plus</li>
                  <li>ETEA/KMU Plus</li>
                  <li>LETEA/KMU Plus (With FCNA)</li>
                  <li>MDCAT/SET Plus</li>
                  <li>LMDCAT/SET Plus (UHS Exclusive)</li>
                  <li>LMDCAT/SET Plus (with FCNA)</li>
                  <li>MDCAT Earlier Prep</li>
                  <li>MDCAT Parallel Prep (Weekend Special)</li>
                </ul>
                
                  <h6 class="col-md-12 details-info-head mb10">
                    What You’ll Get
                  </h6>
               
                    <ul class="list-style-type-check list-col-2">
                      <li>
                        <span
                          >Scheduled Live Lectures on LMS including Question
                          Answer Sessions</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed video lectures on every topic delivered by
                          experienced faculty members from head office</span
                        >
                      </li>
                      <li>
                        <span
                          >Search engine by which reading notes and video
                          lectures of desired topics can be searched at any
                          time</span
                        >
                      </li>
                      <li>
                        <span
                          >MCQs based quizzes, topic wise and chapter wise, with
                          their prompt system generated results and
                          explanations</span
                        >
                      </li>
                      <li>
                        <span
                          >Progress Reports for Course Completion, Subject wise
                          completion, graphs for Quizzes and Assignments and
                          much more</span
                        >
                      </li>
                      <li>
                        <span
                          >Centralized notifications shared on regular basis
                          related to board exams, changes in policies and
                          announcements by universities and much more</span
                        >
                      </li>
                  
                  
                      <li>
                        <span
                          >Subject wise orientation lectures delivered by
                          Subject HODs</span
                        >
                      </li>
                      <li>
                        <span
                          >Reading notes arranged as per topics in SOS with
                          comprehensive details</span
                        >
                      </li>
                      <li>
                        <span
                          >Online Teacher Support in which students can put
                          their queries and get on the spot response</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed assignments and subjective tests with their
                          results provided on LMS after checking by the
                          teachers</span
                        >
                      </li>
                      <li>
                        <span
                          >Leaderboard indicating the position of a student
                          among the top 20 students enrolled in that
                          session</span
                        >
                      </li>
                    </ul>
                  
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="Programs == 'engineering'">
      <div class="page-header">
        <h3>Engineering</h3>
        <p class="course-subhead">Engineering your future</p>
      </div>
      <section class="details-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="details-info">
                <h6 class="details-info-head">About this course</h6>
                <p>
                  KIPS offers multiple sessions for the preparation of ECAT
                  (Combined entrance test for admission to Engineering
                  Institutions of Punjab), NET (Entrance Test for National
                  University of Science and Technology), ETEA (Entrance Test of
                  Public Sector Engineering Universities of KPK), and MUST
                  Entrance Test.
                  <br />In addition, there are sessions designed for the
                  preparation of the entrance tests of 50+ Engineering
                  Universities including FAST, UET, NUST, GIKI, PIEAS, IST,
                  COMSATS, and ITU. Some of these sessions are offered
                  exclusively on weekends (Saturdays & Sundays) as well.
                </p>

                <h6 class="details-info-head mb10">Courses offered</h6>
                <ul class="list-style-type-disc list-col-3">
                  <li>ECAT Plus</li>
                  <li>FUNG Plus</li>
                  <li>Long FUNG Parallel Prep (Weekend Special)</li>
                  <li>NUST Plus Engg.</li>
                  <li>ETEA Plus Engg.</li>
                  <li>Long ETEA Plus Parallel Prep (Weekend Special)</li>
                  <li>FUNGETEA Plus</li>
                  <li>MECAT Plus</li>
                  <li>MFUNG Plus</li>
                </ul>
               
                  <h6 class="col-md-12 details-info-head mb10">
                    What You’ll Get
                  </h6>
                  
                    <ul class="list-style-type-check list-col-2">
                      <li>
                        <span
                          >Scheduled Live Lectures on LMS including Question
                          Answer Sessions</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed video lectures on every topic delivered by
                          experienced faculty members from head office</span
                        >
                      </li>
                      <li>
                        <span
                          >Search engine by which reading notes and video
                          lectures of desired topics can be searched at any
                          time</span
                        >
                      </li>
                      <li>
                        <span
                          >MCQs based quizzes, topic wise and chapter wise, with
                          their prompt system generated results and
                          explanations</span
                        >
                      </li>
                      <li>
                        <span
                          >Progress Reports for Course Completion, Subject wise
                          completion, graphs for Quizzes and Assignments and
                          much more</span
                        >
                      </li>
                      <li>
                        <span
                          >Centralized notifications shared on regular basis
                          related to board exams, changes in policies and
                          announcements by universities and much more</span
                        >
                      </li>
                    
                  
                      <li>
                        <span
                          >Subject wise orientation lectures delivered by
                          Subject HODs</span
                        >
                      </li>
                      <li>
                        <span
                          >Reading notes arranged as per topics in SOS with
                          comprehensive details</span
                        >
                      </li>
                      <li>
                        <span
                          >Online Teacher Support in which students can put
                          their queries and get on the spot response</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed assignments and subjective tests with their
                          results provided on LMS after checking by the
                          teachers</span
                        >
                      </li>
                      <li>
                        <span
                          >Leaderboard indicating the position of a student
                          among the top 20 students enrolled in that
                          session</span
                        >
                      </li>
                    </ul>
                 
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="Programs == 'general-prep'">
      <div class="page-header">
        <h3>General Preps</h3>
        <p class="course-subhead">Actualizing dreams</p>
      </div>
      <section class="details-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="details-info">
                <h6 class="details-info-head">About this course</h6>
                <p>
                  The NUST Plus BBA session has been designed for preparation of
                  NUST NET III (Entrance Test for National University of Science
                  and Technology) for BBA.
                  <br />The G.Prep/NTS Plus session caters to the academic needs
                  of students preparing for universities conducting their own
                  tests through NTS. It has also been designed for the
                  preparation of NAT & BBA of different universities including
                  NUST, IIU, Quaid-e-Azam University (Isb.), and FAST. <br />The
                  FAST/LSE Plus session has been designed exclusively for the
                  preparation of FAST/NU and LSE (Lahore School of Economics).
                </p>

                <h6 class="details-info-head mb10">Courses offered</h6>
                <ul class="list-style-type-disc list-col-3">
                  <li>NUST Plus BBA</li>
                  <li>G.PREP./NTS Plus</li>
                  <li>FAST/LSE Plus</li>
                </ul>
               
                  <h6 class="col-md-12 details-info-head mb10">
                    What You’ll Get
                  </h6>
                  <ul class="list-style-type-check list-col-2">
                      <li>
                        <span
                          >Scheduled Live Lectures on LMS including Question
                          Answer Sessions</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed video lectures on every topic delivered by
                          experienced faculty members from head office</span
                        >
                      </li>
                      <li>
                        <span
                          >Search engine by which reading notes and video
                          lectures of desired topics can be searched at any
                          time</span
                        >
                      </li>
                      <li>
                        <span
                          >MCQs based quizzes, topic wise and chapter wise, with
                          their prompt system generated results and
                          explanations</span
                        >
                      </li>
                      <li>
                        <span
                          >Progress Reports for Course Completion, Subject wise
                          completion, graphs for Quizzes and Assignments and
                          much more</span
                        >
                      </li>
                      <li>
                        <span
                          >Centralized notifications shared on regular basis
                          related to board exams, changes in policies and
                          announcements by universities and much more</span
                        >
                      </li>
                    
                  
                      <li>
                        <span
                          >Subject wise orientation lectures delivered by
                          Subject HODs</span
                        >
                      </li>
                      <li>
                        <span
                          >Reading notes arranged as per topics in SOS with
                          comprehensive details</span
                        >
                      </li>
                      <li>
                        <span
                          >Online Teacher Support in which students can put
                          their queries and get on the spot response</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed assignments and subjective tests with their
                          results provided on LMS after checking by the
                          teachers</span
                        >
                      </li>
                      <li>
                        <span
                          >Leaderboard indicating the position of a student
                          among the top 20 students enrolled in that
                          session</span
                        >
                      </li>
                    </ul>
                  
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="Programs == 'foreign-tests'">
      <div class="page-header">
        <h3>Foreign Tests</h3>
        <p class="course-subhead">Join the erudite</p>
      </div>
      <section class="details-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="details-info">
                <h6 class="details-info-head">About this course</h6>
                <p>
                  We offer regular sessions for the preparation of Graduate
                  Record Examination (GRE), a test created and administered by
                  the Educational Testing Service (ETS) for students aspiring to
                  get admission into graduate schools in the United States or in
                  other English speaking countries.
                  <br />We also offer sessions for a comprehensive preparation
                  of Graduate Management Admission Test (GMAT), a computer
                  adaptive standard test for measuring aptitude to succeed
                  academically in graduate business studies. Business schools
                  commonly use the test as one of many selection criteria for
                  admission into an MBA program. <br />We also have SAT sessions
                  for a thorough preparation of the SAT Reasoning Test (formerly
                  Scholastic Aptitude Test and Scholastic Assessment Test), a
                  standard test for college admissions in the United States and
                  other foreign countries.
                </p>

                <h6 class="details-info-head mb10">Courses offered</h6>
                <ul class="list-style-type-disc list-col-3">
                  <li>GRE</li>
                  <li>GMAT</li>
                  <li>SAT</li>
                </ul>
               
                  <h6 class="col-md-12 details-info-head mb10">
                    What You’ll Get
                  </h6>
                
                    <ul class="list-style-type-check list-col-2">
                      <li>
                        <span
                          >Scheduled Live Lectures on LMS including Question
                          Answer Sessions</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed video lectures on every topic delivered by
                          experienced faculty members from head office</span
                        >
                      </li>
                      <li>
                        <span
                          >Search engine by which reading notes and video
                          lectures of desired topics can be searched at any
                          time</span
                        >
                      </li>
                      <li>
                        <span
                          >MCQs based quizzes, topic wise and chapter wise, with
                          their prompt system generated results and
                          explanations</span
                        >
                      </li>
                      <li>
                        <span
                          >Progress Reports for Course Completion, Subject wise
                          completion, graphs for Quizzes and Assignments and
                          much more</span
                        >
                      </li>
                      <li>
                        <span
                          >Centralized notifications shared on regular basis
                          related to board exams, changes in policies and
                          announcements by universities and much more</span
                        >
                      </li>
                 
                  
                      <li>
                        <span
                          >Subject wise orientation lectures delivered by
                          Subject HODs</span
                        >
                      </li>
                      <li>
                        <span
                          >Reading notes arranged as per topics in SOS with
                          comprehensive details</span
                        >
                      </li>
                      <li>
                        <span
                          >Online Teacher Support in which students can put
                          their queries and get on the spot response</span
                        >
                      </li>
                      <li>
                        <span
                          >Detailed assignments and subjective tests with their
                          results provided on LMS after checking by the
                          teachers</span
                        >
                      </li>
                      <li>
                        <span
                          >Leaderboard indicating the position of a student
                          among the top 20 students enrolled in that
                          session</span
                        >
                      </li>
                    </ul>
              </div>
            </div>
          </div>
        </div> 
      </section>
    </div>-->
  </section>
</template>
<script>
import json from "../../services/data.json";
export default {
  components: {},
  data() {
    return {
      Programs: null,
      Courses: json.Courses,
      filteredProgram: null,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  created() { 
    let routeParams = this.$route.params;
    this.Programs = routeParams.programDetail;
    this.filteredProgram = this.Courses.find(
      (x) => x.ProgramName == this.Programs
    );
  },
  metaInfo: {},
  computed: {},
  methods: {},
};
</script>
