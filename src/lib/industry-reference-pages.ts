import type { IndustrySlug } from "./industries";
import type { IndustryReference } from "./industry-reference-types";

/** Original Century imagery for industry pages and the directory. */
export const industryImages: Record<IndustrySlug, IndustryReference["images"]> = {
  "banking": {
    "hero": "/media/century/photos/banking-advice.webp",
    "heroSmall": "/media/century/photos/banking-advice-768.webp",
    "heroMobile": "/media/century/photos/banking-advice-768.webp",
    "heroWidth": 1600,
    "heroHeight": 900,
    "heroSmallWidth": 768,
    "workflow": "/media/century/photos/team-workshop.webp",
    "workflowAlt": "A business team discussing project notes during a workshop",
    "workflowWidth": 1600,
    "workflowHeight": 900,
    "workflowPosition": "50% 50%",
    "heroPosition": "50% 50%",
    "heroMobilePosition": "84% 50%"
  },
  "telecommunication": {
    "hero": "/media/knowledge.webp",
    "heroSmall": "/media/knowledge.webp",
    "heroMobile": "/media/knowledge.webp",
    "heroWidth": 1200,
    "heroHeight": 675,
    "heroSmallWidth": 1200,
    "workflow": "/media/century/photos/support-team.webp",
    "workflowAlt": "A service team collaborating in a shared workspace",
    "workflowWidth": 1600,
    "workflowHeight": 900,
    "workflowPosition": "50% 50%",
    "heroPosition": "50% 50%",
    "heroMobilePosition": "62% 50%"
  },
  "healthcare": {
    "hero": "/media/century/photos/healthcare-team.webp",
    "heroSmall": "/media/century/photos/healthcare-team-768.webp",
    "heroMobile": "/media/century/photos/healthcare-team-768.webp",
    "heroWidth": 1600,
    "heroHeight": 900,
    "heroSmallWidth": 768,
    "workflow": "/media/century/photos/team-collaboration.webp",
    "workflowAlt": "A team discussing notes and laptop-based work around a shared table",
    "workflowWidth": 1600,
    "workflowHeight": 900,
    "workflowPosition": "50% 50%",
    "heroPosition": "50% 50%",
    "heroMobilePosition": "28% 50%"
  },
  "utilities": {
    "hero": "/media/century/photos/energy-engineers.webp",
    "heroSmall": "/media/century/photos/energy-engineers-768.webp",
    "heroMobile": "/media/century/photos/energy-engineers-768.webp",
    "heroWidth": 1600,
    "heroHeight": 900,
    "heroSmallWidth": 768,
    "workflow": "/media/century/photos/team-workshop.webp",
    "workflowAlt": "A team reviewing a plan together during a workshop",
    "workflowWidth": 1600,
    "workflowHeight": 900,
    "workflowPosition": "50% 50%",
    "heroPosition": "50% 50%",
    "heroMobilePosition": "37% 50%"
  },
  "insurance": {
    "hero": "/media/century/photos/support-team.webp",
    "heroSmall": "/media/century/photos/support-team-768.webp",
    "heroMobile": "/media/century/photos/support-team-768.webp",
    "heroWidth": 1600,
    "heroHeight": 900,
    "heroSmallWidth": 768,
    "workflow": "/media/century/photos/banking-advice.webp",
    "workflowAlt": "A financial adviser reviewing documents with a client",
    "workflowWidth": 1600,
    "workflowHeight": 900,
    "workflowPosition": "50% 50%",
    "heroPosition": "50% 50%",
    "heroMobilePosition": "82% 50%"
  },
  "retail": {
    "hero": "/media/century/photos/retail-team.webp",
    "heroSmall": "/media/century/photos/retail-team-768.webp",
    "heroMobile": "/media/century/photos/retail-team-768.webp",
    "heroWidth": 1600,
    "heroHeight": 900,
    "heroSmallWidth": 768,
    "workflow": "/media/workflows.webp",
    "workflowAlt": "An aerial view of a logistics warehouse with trucks at its loading docks",
    "workflowWidth": 1200,
    "workflowHeight": 675,
    "workflowPosition": "50% 50%",
    "heroPosition": "50% 50%",
    "heroMobilePosition": "50% 50%"
  },
  "airlines": {
    "hero": "/media/support.webp",
    "heroSmall": "/media/support.webp",
    "heroMobile": "/media/support.webp",
    "heroWidth": 1200,
    "heroHeight": 675,
    "heroSmallWidth": 1200,
    "workflow": "/media/stock/scene-airport-woman.webp",
    "workflowAlt": "A traveler using a phone while seated in an airport terminal",
    "workflowWidth": 960,
    "workflowHeight": 540,
    "workflowPosition": "50% 50%",
    "heroPosition": "50% 50%",
    "heroMobilePosition": "50% 50%"
  }
};

export const industryReferencePages: Record<IndustrySlug, IndustryReference> = {
  "banking": {
    "title": "Banking",
    "operationLabel": "banking",
    "audience": "banks",
    "heroDescription": "Bring banking knowledge, documents and service workflows together, with review at every step.",
    "whyIntro": "Connect approved knowledge, case information and the people responsible for each banking decision. Start with a defined workflow, make the evidence visible and keep review in your team's hands.",
    "benefits": [
      {
        "title": "Complete cases",
        "description": "Organise documents and identify missing information before a case reaches the person responsible for review.",
        "icon": "Workflow"
      },
      {
        "title": "Clearer guidance",
        "description": "Help teams find the right policy or procedure, with source references they can inspect before taking action.",
        "icon": "ChartNoAxesCombined"
      },
      {
        "title": "Better handovers",
        "description": "Keep the request, supporting context and open questions together as work moves between banking teams.",
        "icon": "Timer"
      }
    ],
    "workflows": [
      {
        "title": "Application preparation",
        "description": "Bring application materials into a structured case, flag missing documents and prepare a checklist for the reviewer."
      },
      {
        "title": "Policy and procedure knowledge",
        "description": "Find guidance in approved policy versions and show the source behind each answer to an operational question."
      },
      {
        "title": "Service response preparation",
        "description": "Assemble the context for routine product and process queries, with a draft response ready for staff to approve."
      },
      {
        "title": "Operations and reconciliation",
        "description": "Organise records and supporting documents into a review queue, keeping discrepancies and required decisions visible."
      }
    ],
    "reasons": [
      {
        "title": "AI shaped around banking work",
        "description": "Evaluate models against a defined banking task. Keep answers linked to approved information and make limitations visible to the people assessing each case.",
        "image": "/media/century/diagrams/industry-frontier.svg",
        "alt": "A defined task flows through an AI response to human review, with checks for source quality, accuracy and scope"
      },
      {
        "title": "One platform across the bank",
        "description": "Bring knowledge and case preparation together across banking teams. Scope connections to existing systems around the information and actions each workflow needs.",
        "image": "/media/century/diagrams/industry-platform.svg",
        "alt": "Century connects approved sources, workflows and existing systems with people, controlled actions and useful outcomes"
      },
      {
        "title": "Clear access and accountable decisions",
        "description": "Set source permissions, review ownership and retention requirements before rollout. Keep lending decisions and system changes with authorised employees.",
        "image": "/media/century/diagrams/industry-governance.svg",
        "alt": "Access permissions, approved sources and human approval connect to a controlled workflow"
      },
      {
        "title": "Implementation alongside your team",
        "description": "Begin with a practical banking workflow, agree its review steps and work with Century through implementation, handover and the next phase of improvement.",
        "image": "/media/century/diagrams/industry-deployment.svg",
        "alt": "Four connected delivery stages: scope, build, validate and handover"
      }
    ],
    "images": industryImages.banking,
    "benefitMobileOrder": [
      2,
      0,
      1
    ]
  },
  "telecommunication": {
    "title": "Telecom",
    "operationLabel": "telecom",
    "audience": "telecom providers",
    "heroDescription": "Connect service knowledge, fault triage and customer requests, with clear handovers and human review.",
    "whyIntro": "Bring service information, troubleshooting history and customer requests into a clearer workflow. Begin with a focused use case, agree the review steps and give each handover a named owner.",
    "benefits": [
      {
        "title": "Useful context",
        "description": "Capture the issue and the steps already completed, so customers and support teams can move the conversation forward.",
        "icon": "UsersRound"
      },
      {
        "title": "Consistent guidance",
        "description": "Help operators find approved service information and the current procedure for the request in front of them.",
        "icon": "Coins"
      },
      {
        "title": "Connected support",
        "description": "Give the next team a clear picture of what is known, what has been tried and what still needs attention.",
        "icon": "ChartNoAxesColumnIncreasing"
      }
    ],
    "workflows": [
      {
        "title": "Fault triage and troubleshooting",
        "description": "Collect symptoms, surface approved troubleshooting steps and prepare a structured case for the operator or specialist."
      },
      {
        "title": "Service and account requests",
        "description": "Gather the information behind a routine change, with identity checks and authorisation kept in your existing process."
      },
      {
        "title": "Billing support",
        "description": "Explain verified invoice details and organise dispute information for the billing team to assess and resolve."
      },
      {
        "title": "Incident updates",
        "description": "Prepare customer communications from verified incident information, with wording and timing approved by the owner."
      }
    ],
    "reasons": [
      {
        "title": "AI grounded in service knowledge",
        "description": "Apply models to a defined support task, evaluate the output and retain the source information that operators need to check a recommendation.",
        "image": "/media/century/diagrams/industry-frontier.svg",
        "alt": "A defined task flows through an AI response to human review, with checks for source quality, accuracy and scope"
      },
      {
        "title": "One platform across telecom teams",
        "description": "Connect the knowledge behind customer care, field work, network issues and billing. Plan each system connection around an agreed operational scope.",
        "image": "/media/century/diagrams/industry-platform.svg",
        "alt": "Century connects approved sources, workflows and existing systems with people, controlled actions and useful outcomes"
      },
      {
        "title": "Controlled actions and clear escalation",
        "description": "Use verified service information, define who can approve changes and make escalation paths explicit when a request needs specialist attention.",
        "image": "/media/century/diagrams/industry-governance.svg",
        "alt": "Access permissions, approved sources and human approval connect to a controlled workflow"
      },
      {
        "title": "A delivery team working with yours",
        "description": "Scope an initial service workflow with Century, agree practical review points and support your operators through implementation and handover.",
        "image": "/media/century/diagrams/industry-deployment.svg",
        "alt": "Four connected delivery stages: scope, build, validate and handover"
      }
    ],
    "images": industryImages.telecommunication,
    "benefitMobileOrder": [
      2,
      0,
      1
    ]
  },
  "healthcare": {
    "title": "Healthcare",
    "operationLabel": "healthcare",
    "audience": "healthcare organisations",
    "heroDescription": "Support the work around care with organised information, approved knowledge and professional review.",
    "whyIntro": "Connect approved procedures, administrative information and the professionals responsible for each step. Start with a defined workflow, limit access to what is needed and keep review visible.",
    "benefits": [
      {
        "title": "Accessible knowledge",
        "description": "Help staff locate the approved procedure and inspect its source before responding to an administrative question.",
        "icon": "HeartPulse"
      },
      {
        "title": "Prepared information",
        "description": "Organise the documents and details needed for a request, with missing information made clear to the reviewer.",
        "icon": "Gauge"
      },
      {
        "title": "Professional oversight",
        "description": "Make responsibilities and access boundaries explicit, with qualified people reviewing work before decisions are made.",
        "icon": "CalendarCheck"
      }
    ],
    "workflows": [
      {
        "title": "Administrative guidance",
        "description": "Find answers in approved procedures, show the relevant source and route uncertain questions to the responsible team."
      },
      {
        "title": "Scheduling and referrals",
        "description": "Prepare appointment and referral information for authorised staff to verify and route through existing systems."
      },
      {
        "title": "Document preparation",
        "description": "Bring permitted records into a source-linked draft, keeping clinical interpretation and decisions with qualified staff."
      },
      {
        "title": "Internal service requests",
        "description": "Organise procurement, supplier and support requests with the information, ownership and review steps each team needs."
      }
    ],
    "reasons": [
      {
        "title": "AI for the work around care",
        "description": "Evaluate models against a defined administrative task. Keep approved sources visible and prepare information that authorised professionals can review.",
        "image": "/media/century/diagrams/industry-frontier.svg",
        "alt": "A defined task flows through an AI response to human review, with checks for source quality, accuracy and scope"
      },
      {
        "title": "One platform across healthcare teams",
        "description": "Bring approved knowledge and administrative workflows together. Scope connections to existing records and operational systems around each team's responsibilities.",
        "alt": "Century connects approved sources, workflows and existing systems with people, controlled actions and useful outcomes",
        "image": "/media/century/diagrams/industry-platform.svg"
      },
      {
        "title": "Access boundaries and professional review",
        "description": "Define the information each role needs and who reviews the result. Agree processing, retention and deployment requirements for the healthcare environment.",
        "image": "/media/century/diagrams/industry-governance.svg",
        "alt": "Access permissions, approved sources and human approval connect to a controlled workflow"
      },
      {
        "title": "Practical support through implementation",
        "description": "Choose a focused administrative workflow with Century and work through its access rules, review steps and handover with the people who will use it.",
        "image": "/media/century/diagrams/industry-deployment.svg",
        "alt": "Four connected delivery stages: scope, build, validate and handover"
      }
    ],
    "images": industryImages.healthcare,
    "benefitMobileOrder": [
      2,
      0,
      1
    ]
  },
  "utilities": {
    "title": "Utilities",
    "operationLabel": "utility",
    "audience": "utilities",
    "heroDescription": "Connect utility requests, approved guidance and operational context with accountable review.",
    "whyIntro": "Century helps utility teams turn a defined service process into a connected workflow, with approved sources, explicit review points and clear ownership of every operational decision.",
    "benefits": [
      {
        "title": "Clearer customer service",
        "description": "Prepare useful answers to billing and service questions, with the relevant policy and request details available together.",
        "icon": "Headset"
      },
      {
        "title": "Complete operational context",
        "description": "Give each team the documents, procedures and outstanding questions it needs to review the next step.",
        "icon": "Gauge"
      },
      {
        "title": "Support changing demand",
        "description": "Organize incoming requests into consistent cases, keeping urgent issues on the established escalation path.",
        "icon": "ChartNoAxesColumnIncreasing"
      }
    ],
    "workflows": [
      {
        "title": "Field knowledge and handovers",
        "description": "Find approved procedures and prepare site information for staff review. Safety decisions and emergency response stay with authorized operators."
      },
      {
        "title": "Connection request preparation",
        "description": "Assemble submitted site documents, identify missing requirements and prepare a complete pack for the connection team."
      },
      {
        "title": "Service visit coordination",
        "description": "Collect customer requests and access details so the service team can confirm requirements and arrange the next authorized step."
      },
      {
        "title": "Billing question support",
        "description": "Bring permitted account information and approved billing guidance together for a reviewed response or finance-team handover."
      }
    ],
    "reasons": [
      {
        "title": "AI grounded in utility knowledge",
        "description": "Start from the procedures and service policies your teams approve. Evaluate answers against defined tasks before expanding the workflow.",
        "image": "/media/century/diagrams/industry-frontier.svg",
        "alt": "A defined task flows through an AI response to human review, with checks for source quality, accuracy and scope"
      },
      {
        "title": "A connected utility workflow",
        "description": "Bring service requests, field knowledge and billing context into a shared process, with interfaces scoped to the systems involved.",
        "image": "/media/century/diagrams/industry-platform.svg",
        "alt": "Century connects approved sources, workflows and existing systems with people, controlled actions and useful outcomes"
      },
      {
        "title": "Control at each decision",
        "description": "Set access permissions, review points and escalation rules around operational information. Technical approvals remain with the responsible utility team.",
        "image": "/media/century/diagrams/industry-governance.svg",
        "alt": "Access permissions, approved sources and human approval connect to a controlled workflow"
      },
      {
        "title": "Support from scoping to rollout",
        "description": "Define one useful process with Century, validate it with the people who own it and plan the next stage from observed results.",
        "image": "/media/century/diagrams/industry-deployment.svg",
        "alt": "Four connected delivery stages: scope, build, validate and handover"
      }
    ],
    "images": industryImages.utilities,
    "benefitMobileOrder": [
      2,
      0,
      1
    ],
    "ctaLabel": "utilities"
  },
  "insurance": {
    "title": "Insurance",
    "operationLabel": "insurance",
    "audience": "insurers",
    "heroDescription": "Bring complex insurance workflows into everyday operation, with clear oversight from start to finish.",
    "whyIntro": "Connect the knowledge, people and systems behind each insurance workflow. Begin with a clear scope, keep review visible, and give your teams a practical foundation they can build on across the operation.",
    "benefits": [
      {
        "title": "Flexible capacity",
        "description": "Give teams room to handle busy periods by reducing repetitive work and paperwork.",
        "icon": "ChartNoAxesColumnIncreasing"
      },
      {
        "title": "Business growth",
        "description": "Help people prepare relevant proposals with a clearer view of customer needs and policy information.",
        "icon": "Expand"
      },
      {
        "title": "Efficient operations",
        "description": "Connect the information behind claims, underwriting and service, with a clear next step for every task.",
        "icon": "Settings2"
      }
    ],
    "workflows": [
      {
        "title": "Sales and underwriting",
        "description": "Prepare submissions, find missing information and bring relevant policy guidance to the reviewer."
      },
      {
        "title": "Policy service and renewals",
        "description": "Find coverage information, prepare policy changes and help teams respond with the right context."
      },
      {
        "title": "Claims handling",
        "description": "Organise incoming documents, assemble the claim history and prepare a case for assessment."
      },
      {
        "title": "Risk and oversight",
        "description": "Surface relevant evidence, document the review and keep responsibility with the right person."
      }
    ],
    "reasons": [
      {
        "title": "Advanced AI, applied to real work",
        "description": "Select models around a defined task, evaluate their output and keep the information behind an answer visible to the people using it.",
        "image": "/media/century/diagrams/industry-frontier.svg",
        "alt": "A defined task flows through an AI response to human review, with checks for source quality, accuracy and scope"
      },
      {
        "title": "One platform for the entire insurer",
        "description": "Bring knowledge and workflows together across insurance teams. Plan connections to existing systems around the scope of each deployment.",
        "image": "/media/century/diagrams/industry-platform.svg",
        "alt": "Century connects approved sources, workflows and existing systems with people, controlled actions and useful outcomes"
      },
      {
        "title": "Control and traceability, by design",
        "description": "Define access, source boundaries and review responsibilities before rollout. Discuss retention, hosting and compliance requirements for your environment.",
        "image": "/media/century/diagrams/industry-governance.svg",
        "alt": "Access permissions, approved sources and human approval connect to a controlled workflow"
      },
      {
        "title": "A team that delivers alongside yours",
        "description": "Work with Century from the first scoped workflow through implementation and handover, with clear ownership and practical support for your team.",
        "image": "/media/century/diagrams/industry-deployment.svg",
        "alt": "Four connected delivery stages: scope, build, validate and handover"
      }
    ],
    "benefitMobileOrder": [
      3,
      1,
      2
    ],
    "images": industryImages.insurance
  },
  "retail": {
    "title": "Retail",
    "operationLabel": "retail",
    "audience": "retailers",
    "heroDescription": "Connect store, service and supplier workflows around approved information and reviewed actions.",
    "whyIntro": "Century helps retail teams connect a focused service or back-office process to the people and information it needs, with current product facts, clear review steps and named process owners.",
    "benefits": [
      {
        "title": "Consistent customer answers",
        "description": "Prepare service responses from current product and policy sources across the teams handling each request.",
        "icon": "Network"
      },
      {
        "title": "Guidance for every store",
        "description": "Make approved procedures and product information easier for associates to find and inspect.",
        "icon": "ChartNoAxesCombined"
      },
      {
        "title": "Prepared back-office work",
        "description": "Bring supplier documents and purchase references together so finance and procurement teams can review exceptions.",
        "icon": "ShieldHalf"
      }
    ],
    "workflows": [
      {
        "title": "Product and campaign preparation",
        "description": "Collect approved product facts and channel requirements into a draft that a marketing or product owner checks before publication."
      },
      {
        "title": "Store and associate guidance",
        "description": "Locate current procedures and training information, with source references and a clear route for questions outside the guidance."
      },
      {
        "title": "Order and return support",
        "description": "Prepare responses using permitted order context and service policies. Staff approve refunds and order changes through existing processes."
      },
      {
        "title": "Supplier document preparation",
        "description": "Extract invoice details, connect purchase references and highlight discrepancies for the employee responsible for approval."
      }
    ],
    "reasons": [
      {
        "title": "AI grounded in retail knowledge",
        "description": "Use approved product and service sources to prepare answers, then evaluate the workflow against the questions your teams actually receive.",
        "image": "/media/century/diagrams/industry-frontier.svg",
        "alt": "A defined task flows through an AI response to human review, with checks for source quality, accuracy and scope"
      },
      {
        "title": "A connected retail workflow",
        "description": "Link a defined process across store, service and back-office teams, with the order and product interfaces agreed during scoping.",
        "image": "/media/century/diagrams/industry-platform.svg",
        "alt": "Century connects approved sources, workflows and existing systems with people, controlled actions and useful outcomes"
      },
      {
        "title": "Review before commercial action",
        "description": "Keep publication, refunds, supplier changes and payments behind explicit review points, with source information available to the decision owner.",
        "image": "/media/century/diagrams/industry-governance.svg",
        "alt": "Access permissions, approved sources and human approval connect to a controlled workflow"
      },
      {
        "title": "Support from scoping to rollout",
        "description": "Work with Century to select a useful starting process, validate it with store and operations teams, and plan improvements from feedback.",
        "image": "/media/century/diagrams/industry-deployment.svg",
        "alt": "Four connected delivery stages: scope, build, validate and handover"
      }
    ],
    "images": industryImages.retail,
    "benefitMobileOrder": [
      2,
      0,
      1
    ]
  },
  "airlines": {
    "title": "Airlines",
    "operationLabel": "airline",
    "audience": "airlines",
    "heroDescription": "Prepare passenger answers, disruption handovers and service cases with verified context.",
    "whyIntro": "Century helps airline service teams prepare a clear next step from approved journey information and policy sources, with staff review before communications, booking changes or claim decisions.",
    "benefits": [
      {
        "title": "Clearer passenger support",
        "description": "Give service staff policy references and permitted journey context when preparing an answer to a passenger question.",
        "icon": "ChartNoAxesCombined"
      },
      {
        "title": "Stronger service handovers",
        "description": "Keep verified information, the passenger request and completed actions together as a case passes between teams.",
        "icon": "Coins"
      },
      {
        "title": "Better prepared case files",
        "description": "Organize evidence and outstanding questions before a claim or service exception reaches its authorized reviewer.",
        "icon": "Clock"
      }
    ],
    "workflows": [
      {
        "title": "Disruption communication support",
        "description": "Organize approved updates and journey context into a draft or handover. Staff authorize communications, rebooking and refund actions."
      },
      {
        "title": "Passenger policy guidance",
        "description": "Prepare answers to travel, baggage and service questions using approved guidance, with references an employee can check."
      },
      {
        "title": "Claims document preparation",
        "description": "Gather supporting evidence and identify missing information for the specialist responsible for entitlement and compensation decisions."
      },
      {
        "title": "Internal service knowledge",
        "description": "Help authorized employees locate current procedures and prepare cross-team handovers within established operational and safety controls."
      }
    ],
    "reasons": [
      {
        "title": "AI grounded in airline knowledge",
        "description": "Build a focused workflow around approved service guidance, check the quality of its answers and define when a specialist must take over.",
        "image": "/media/century/diagrams/industry-frontier.svg",
        "alt": "A defined task flows through an AI response to human review, with checks for source quality, accuracy and scope"
      },
      {
        "title": "A connected service workflow",
        "description": "Bring passenger requests, permitted journey details and case documents together, with each required system interface defined before rollout.",
        "image": "/media/century/diagrams/industry-platform.svg",
        "alt": "Century connects approved sources, workflows and existing systems with people, controlled actions and useful outcomes"
      },
      {
        "title": "Review before passenger actions",
        "description": "Set access and approval rules for customer information. Booking changes, refunds and entitlement decisions remain with authorized teams.",
        "image": "/media/century/diagrams/industry-governance.svg",
        "alt": "Access permissions, approved sources and human approval connect to a controlled workflow"
      },
      {
        "title": "Support from scoping to rollout",
        "description": "Work with Century and your service owners to validate a practical first workflow, gather feedback and agree the next stage.",
        "image": "/media/century/diagrams/industry-deployment.svg",
        "alt": "Four connected delivery stages: scope, build, validate and handover"
      }
    ],
    "images": industryImages.airlines,
    "benefitMobileOrder": [
      2,
      0,
      1
    ],
    "ctaLabel": "aviation"
  }
};
