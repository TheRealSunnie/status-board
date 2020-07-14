/**
 *  Sign in the user upon button click.
 */
export function handleAuthClick(event) {
  window.gapi.auth2.getAuthInstance().signIn();
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export function getDayOfTheWeek() {
  const date = new Date();
  const dayOfWeekIndex = date.getDay();
  return days[dayOfWeekIndex];
}

function getAssignee(assignment) {
  const name = assignment[0];
  return name;
}

function findAllIndexes(array, fn) {
  const indexes = [];

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (fn(value)) {
      indexes.push(i);
    }
  }
  return indexes;
}

export function getAssigneesForChore(assignments, choreIndex) {
  const assignees = [];

  function equalsChoreIndex(v) {
    return v === "x"; // returned true if v=== 'x'
  }

  function equalsAssignee(assignmentIndex) {
    return assignmentIndex === choreIndex; // returned true if assignmentIndex === choreIndex
  }

  assignments.forEach(function(assignment) {
    const assignmentIndexes = findAllIndexes(assignment, equalsChoreIndex);

    if (assignmentIndexes.some(equalsAssignee)) {
      const assignee = getAssignee(assignment);
      assignees.push(assignee);
    }
  });
  return assignees;
}
