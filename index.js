let courses = [];

    function addCourse() {
      const courseInput = document.getElementById('courses');
      const pageInput = document.getElementById('pages');
      const courseName = courseInput.value;
      const numPages = parseInt(pageInput.value);
      const daysRemaining = parseInt(document.getElementById('days').value);

      if (courseName && numPages && daysRemaining) {
        const course = {
          name: courseName,
          pages: numPages
        };

        courses.push(course);
        displayCourses();
        generateStudyPlan(daysRemaining);
        courseInput.value = '';
        pageInput.value = '';
      }
    }

function displayCourses() {
  const studyPlan = document.getElementById('study-plan');
  studyPlan.innerHTML = '';

  courses.forEach((course) => {
    const li = document.createElement('li');
    li.textContent = course.name + ' - ' + course.pages + ' pages';
    studyPlan.appendChild(li);
  });
}

function generateStudyPlan(daysRemaining) {
  const studyPlanContainer = document.getElementById('study-plan');
  studyPlanContainer.innerHTML = '';

  const totalStudyPages = courses.reduce((total, course) => total + course.pages, 0);
  const averagePagesPerDay = Math.round(totalStudyPages / daysRemaining);

  if (averagePagesPerDay <= 0) {
    studyPlanContainer.innerHTML = 'No study required.';
    return;
  }

  let studyPagesRemaining = totalStudyPages;
  let daysLeft = daysRemaining;

  courses.forEach((course) => {
    const studyPages = Math.min(Math.ceil(course.pages / daysRemaining), studyPagesRemaining);
    const li = document.createElement('li');
    li.textContent = `${course.name}: ${studyPages} pages`;
    studyPlanContainer.appendChild(li);
    studyPagesRemaining -= studyPages;
    daysLeft--;
  });
}

