export default function() {
  return [
    {
      title: "Overview",
      htmlBefore: '<i class="material-icons">dashboard</i>',
      to: "/overview"
    },
    {
      title: "Progress",
      htmlBefore: '<i class="material-icons">timeline</i>',
      to: "/progress"
    },
    {
      title: "Questions",
      htmlBefore: '<i class="material-icons">question_answer</i>',
      to: "/questions",
    },
    {
      title: "Responses",
      htmlBefore: '<i class="material-icons">speaker_notes</i>',
      to: "/responses",
    },
    {
      title: "Assignments",
      htmlBefore: '<i class="material-icons">assignment</i>',
      to: "/assignments"
    },
    {
      title: "Instructions",
      htmlBefore: '<i class="material-icons">help</i>',
      to: "/instructions"
    },
    {
      title: "Logout",
      htmlBefore: '<i class="material-icons text-danger">logout</i>',
      to: "/logout"
    }
  ];
}
