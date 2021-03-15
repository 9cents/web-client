export default function() {
  return [
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
      htmlBefore: '<i class="material-icons">alarm</i>',
      to: "/assignments"
    },
    {
      title: "Logout",
      htmlBefore: '<i class="material-icons text-danger">logout</i>',
      to: "/"
    }
  ];
}
