export const principles = [
  {
    emphasis: true,
    title: "Quality is an engineering capability.",
    detail:
      "It belongs in the design discussion, in the code, in the pipeline, and in whatever happens after release.",
  },
  {
    emphasis: true,
    title: "Reliable information beats test volume.",
    detail:
      "A failing test that can’t tell you why is noise with a red icon on it. Good automation makes the next step obvious.",
  },
  {
    emphasis: false,
    title: "Architecture should improve developer speed.",
    detail:
      "A well-built test system answers in minutes and doesn’t ask you to hold the whole thing in your head.",
  },
  {
    emphasis: false,
    title: "Use the right kind of reasoning.",
    detail:
      "Deterministic code, a language model, and a person are each good at very different things. Match the tool to the part of the problem.",
  },
  {
    emphasis: false,
    title: "Decisions need evidence and context.",
    detail:
      "What broke last quarter and what the product actually does should count for more than whatever is fashionable this year.",
  },
] as const;
