export type ArticleCategory = "Getting started" | "Knowledge" | "Workflows" | "Deployment";

export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  readingTime: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "choose-first-ai-workflow",
    title: "Start with one workflow. Make it worth repeating.",
    description: "A practical way to choose a first AI project: start with a recurring task, a clear owner and an outcome you can inspect.",
    category: "Getting started",
    readingTime: "4 min read",
    sections: [
      {
        id: "find-the-repetition",
        title: "Find the repetition before choosing the technology",
        paragraphs: [
          "A useful first AI project begins with a specific piece of work. Look for a task that a team repeats often enough to understand its inputs, decisions and handoffs. Finding the right policy, preparing a document summary or checking an incoming request can be a better starting point than a broad ambition to transform an entire department.",
          "Ask someone who performs the task to walk through a recent example. What triggered it? Where did the information come from? Which parts were straightforward, and where did judgement matter? Follow the work as it happens, including the spreadsheet, message or manual step that a process diagram may leave out.",
        ],
      },
      {
        id: "define-the-boundary",
        title: "Give the project a clear beginning and end",
        paragraphs: [
          "Write a short description of the workflow in plain language: when a request arrives, use these approved sources to prepare this output for this person. Define what the system may do and where its responsibility stops. An assistant that prepares a supplier checklist has a different boundary from a system that approves a supplier.",
          "Keep the first scope narrow enough that people can recognise a good result. Limit the document types, user group or decision being supported. That boundary makes exceptions visible and gives the team room to improve the workflow without changing several business processes at once.",
        ],
      },
      {
        id: "choose-the-owner",
        title: "Choose an owner who can judge the output",
        paragraphs: [
          "Name the person responsible for the business outcome, alongside the people responsible for implementation and access. The process owner should be able to explain the expected result, identify unacceptable mistakes and decide when the workflow needs a human handoff.",
          "Bring that person into the design early. Their examples of ambiguous requests, outdated documents and missing information are as useful as examples that go smoothly. A first project needs a clear route for feedback and correction, not just an enthusiastic sponsor.",
        ],
      },
      {
        id: "define-success",
        title: "Make success observable",
        paragraphs: [
          "Agree how you will compare the new workflow with the current one. You might observe the time needed to prepare a reviewed answer, the number of incomplete submissions or how frequently someone has to find a missing source. Choose a small set of measures that describe the work rather than activity alone.",
          "Collect a baseline before the pilot. Decide which examples will be used for evaluation and include cases that should be declined or escalated. A fast answer is useful only when it is suitable for the decision the team needs to make.",
        ],
        points: [
          "One recurring task and a named process owner.",
          "An approved set of inputs and a defined output.",
          "A review point, an exception route and a baseline.",
        ],
      },
      {
        id: "expand-deliberately",
        title: "Expand from evidence",
        paragraphs: [
          "Run the pilot with the people who will use it. Review useful results and failures together, then adjust the sources, instructions or handoffs. Keep a record of what changed so that improvements can be distinguished from changes in the examples being used.",
          "When the workflow is reliable enough for its agreed purpose, decide whether to widen the user group, add another source or introduce a further action. Take one step at a time. The result of a good first project is a useful operating pattern that the team understands and can maintain.",
        ],
      },
    ],
  },
  {
    slug: "answers-need-sources",
    title: "An answer is more useful when you can inspect its sources.",
    description: "How to organise business knowledge so an AI answer can be checked, challenged and kept up to date.",
    category: "Knowledge",
    readingTime: "4 min read",
    sections: [
      {
        id: "start-with-evidence",
        title: "Make the evidence part of the answer",
        paragraphs: [
          "A fluent answer can be easy to read and still be difficult to use. When a colleague asks about an approval rule or a supplier requirement, they need to know which document supports the response. A useful knowledge assistant helps the reader move from the answer to the relevant evidence.",
          "Treat sources as part of the interface. Give the reader a recognisable document name, a relevant passage and enough context to understand how it supports the answer. A link to a large folder is a starting point, but it leaves the actual verification work to the person asking.",
        ],
      },
      {
        id: "prepare-the-knowledge",
        title: "Decide which knowledge belongs in scope",
        paragraphs: [
          "Begin with a controlled collection of documents for a specific team or workflow. Identify the owners, status and intended audience of each source. Draft guidance, archived material and an approved policy may look similar in a search result, while having very different authority for a business decision.",
          "Make those distinctions explicit. Resolve duplicate documents and decide how superseded versions should be handled. Where two current sources disagree, the assistant should surface the conflict or route the question to an owner. It should not quietly choose the most convenient version.",
        ],
      },
      {
        id: "respect-access",
        title: "Keep access rules attached to the content",
        paragraphs: [
          "A knowledge system needs a clear answer to a simple question: is this person allowed to use this source? Access decisions should apply when information is retrieved and when the result is presented. A citation should not become a route around the restrictions of the underlying system.",
          "Plan for access changes as well as the initial setup. Someone may move teams, a document may become restricted or a source may be removed. Agree how those changes reach the assistant and what happens while an update is still in progress.",
        ],
      },
      {
        id: "show-uncertainty",
        title: "Let the system say what it could not establish",
        paragraphs: [
          "If the approved sources do not contain the answer, a useful response explains that limit. It can state what was found, identify the missing information and suggest the next responsible person or step. Filling the gap with a plausible statement makes the response harder to trust.",
          "Evaluate more than whether a citation is present. Check whether the cited passage supports the actual claim, whether the answer includes an important qualification and whether the source is current for the question. Inspect these details with the people who know the material.",
        ],
        points: [
          "Can the reader open and understand the supporting passage?",
          "Does the source support this claim, including its exceptions?",
          "What should happen when information is missing or contradictory?",
        ],
      },
      {
        id: "maintain-the-system",
        title: "Give knowledge a maintenance routine",
        paragraphs: [
          "Useful knowledge changes. Assign responsibility for adding approved material, reviewing outdated content and responding to incorrect answers. Decide how the team will learn that a source has changed and how to verify the resulting answers after an update.",
          "Start with a manageable collection and a small set of representative questions. Review the answers regularly and record the reasons behind corrections. This makes the assistant part of a maintained knowledge process, with sources and ownership that remain visible as the system grows.",
        ],
      },
    ],
  },
  {
    slug: "human-review",
    title: "Put human review where the decision matters.",
    description: "Design approval steps that give people the evidence, authority and time to make a meaningful decision.",
    category: "Workflows",
    readingTime: "4 min read",
    sections: [
      {
        id: "map-the-decisions",
        title: "Separate preparation from commitment",
        paragraphs: [
          "An AI workflow can gather information, prepare a draft and recommend a next step without having authority to commit the business to that step. Before adding automation, identify the point where preparation becomes an action: sending a message, changing a record, approving a request or triggering a downstream process.",
          "Describe that boundary in the workflow itself. Make it clear which outputs are drafts, which actions are permitted and which require explicit approval. A reviewer should never have to infer whether an action has already taken place from the wording of a status message.",
        ],
      },
      {
        id: "show-the-context",
        title: "Give the reviewer enough context",
        paragraphs: [
          "A review screen should explain what is being proposed and why. Present the original request, the proposed output, the relevant source material and any information that could not be established. If an action changes a record, show the existing value alongside the proposed value.",
          "Design the handoff around the reviewer’s actual responsibility. Someone checking a document for completeness needs different information from someone authorising a payment. Avoid overwhelming both with the same undifferentiated activity log. Make the material needed for the decision easy to inspect.",
        ],
      },
      {
        id: "assign-responsibility",
        title: "Make ownership and authority explicit",
        paragraphs: [
          "Choose who can approve each type of action and how work reaches them. Define what should happen when that person is unavailable, when two people disagree or when a request falls outside their authority. An exception needs an owner and a route back into the process.",
          "Review should be a meaningful choice. Provide a way to reject, correct or request more information, with a reason that the next person can understand. Record the final decision and connect it to the output that was actually reviewed, so later changes do not inherit an earlier approval by accident.",
        ],
      },
      {
        id: "plan-the-exceptions",
        title: "Design the uncomfortable cases first",
        paragraphs: [
          "Walk through scenarios with missing documents, contradictory instructions and an unavailable downstream system. Decide whether the workflow waits, produces a limited draft or hands the task to a person. Explain the current state clearly so that silence is not mistaken for successful completion.",
          "Also consider repeated requests. If a person presses approve twice or a connection fails after an action, the workflow needs a way to determine what already happened before attempting it again. The user should be able to see the outcome without guessing whether they have duplicated the work.",
        ],
        points: [
          "What exactly is the reviewer approving?",
          "Which evidence and uncertainties accompany the proposal?",
          "Who owns rejection, correction and an interrupted action?",
        ],
      },
      {
        id: "review-the-review",
        title: "Check whether the handoff works in practice",
        paragraphs: [
          "During a pilot, observe how reviewers use the workflow. Where do they need to open another system? Which explanations are unclear? Are proposals waiting because the responsible person or required information is missing? These observations can reveal improvements to the process as well as the assistant.",
          "Use that feedback to refine the approval boundary and the presentation of evidence. Keep the level of automation proportionate to what the team can evaluate and operate. Human oversight works best when it is a designed part of the workflow, with clear responsibility at each consequential decision.",
        ],
      },
    ],
  },
  {
    slug: "plan-ai-deployment",
    title: "Before deployment, agree how the system will operate.",
    description: "A deployment brief for data, access, integrations, review and ownership—before an AI workflow becomes part of daily work.",
    category: "Deployment",
    readingTime: "4 min read",
    sections: [
      {
        id: "write-the-brief",
        title: "Create a shared deployment brief",
        paragraphs: [
          "Moving an AI workflow into daily use involves more than choosing where the application runs. The business owner, technical team and people responsible for data need a shared understanding of the system’s purpose, dependencies and operating boundaries. A short deployment brief gives those conversations a concrete starting point.",
          "Describe the workflow, its users and the systems it touches. Identify what the first release includes and what remains outside scope. Keep unresolved decisions visible, with an owner for each, so that an assumption in one team does not become an unexpected dependency for another.",
        ],
      },
      {
        id: "trace-the-data",
        title: "Follow the data through the whole workflow",
        paragraphs: [
          "List the information the workflow receives, retrieves, generates and stores. For each stage, establish the processing location and any external service involved. Consider prompts, uploaded files, generated outputs, diagnostic records and backups, rather than looking only at the main document store.",
          "Agree which data is necessary, how long it should remain available and who can access it for support. Record how deletion or source updates will be handled. These are deployment decisions to confirm with the responsible teams; a public website or a product label cannot establish them for a specific environment.",
        ],
      },
      {
        id: "define-the-interfaces",
        title: "Define access and integration boundaries",
        paragraphs: [
          "Identify how users sign in, how their permissions are determined and which credentials the workflow uses when connecting to another system. Separate the permission to read information from the permission to make a change. Grant the workflow only the access needed for its agreed purpose.",
          "For each integration, document the expected inputs, outputs and failure behaviour. Decide what the user sees if the connection is unavailable or a request is refused. Confirm how the system can resume safely and how the team will know whether a downstream action completed.",
        ],
      },
      {
        id: "agree-readiness",
        title: "Define readiness in terms of the work",
        paragraphs: [
          "Agree the examples and operating conditions that must be reviewed before release. Include normal requests, missing information, restricted content and requests outside scope. The goal is to understand whether the workflow is suitable for its intended users and decisions.",
          "Make the acceptance decision together with the process owner. Document remaining limitations, the review steps that stay in place and the route for escalation. Start with a controlled user group where necessary, and define how feedback will inform the next release.",
        ],
        points: [
          "Data locations, retention and external dependencies are documented.",
          "Users, permissions and consequential actions have clear boundaries.",
          "A process owner has reviewed the workflow and its limitations.",
          "Support, change control and a way to pause the workflow are agreed.",
        ],
      },
      {
        id: "plan-the-operation",
        title: "Assign ownership beyond launch",
        paragraphs: [
          "Name the people who will maintain the sources, manage access, investigate problems and approve changes. Decide which activity and output information is useful for those responsibilities, while limiting unnecessary sensitive data in logs. Agree how problems are reported and who can pause the workflow.",
          "Review the brief when the scope, model, source collection or integration changes. Deployment is the beginning of an operating relationship with the system. Keeping its assumptions and responsibilities current helps the team make informed decisions as that relationship develops.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
