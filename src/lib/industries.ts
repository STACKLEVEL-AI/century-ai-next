export type IndustrySlug =
  | "banking"
  | "telecommunication"
  | "healthcare"
  | "utilities"
  | "insurance"
  | "retail"
  | "airlines";

export type IndustryFeature = { title: string; description: string };

export type IndustryWorkflow = {
  title: string;
  summary: string;
  inputs: string;
  review: string;
  outcome: string;
};

export type Industry = {
  slug: IndustrySlug;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  headline: string[];
  intro: string;
  goalsTitle: string;
  goals: IndustryFeature[];
  workflows: IndustryWorkflow[];
  processTitle: string;
  processContext: string;
  process: IndustryFeature[];
  controlIntro: string;
  controls: IndustryFeature[];
  visual: { title: string; reference: string; steps: string[] };
  relatedSlugs: IndustrySlug[];
};

// Sector examples describe workflows to scope, not customer deployments or results.
export const industries: Industry[] = [
  {
    slug: "banking",
    title: "Banking",
    seoTitle: "AI for Banking",
    description: "Explore banking AI workflows with a shared task register, controlled pilots, source references and accountable human review",
    eyebrow: "Century for banking",
    headline: ["Clarity for your", "most complex workflows."],
    intro: "Give banking teams a clearer path from information to a reviewed next step. Start with approved knowledge, complete document packs and the decisions your people own.",
    goalsTitle: "Make the work around each decision easier.",
    goals: [
      { title: "Prepare complete cases", description: "Identify required documents and missing information before a case reaches its reviewer." },
      { title: "Make policy easier to find", description: "Help staff locate relevant procedures and inspect the sources behind an answer." },
      { title: "Improve service handovers", description: "Bring the request, supporting context and unresolved questions together for the next team." },
    ],
    workflows: [
      {
        title: "Application and document preparation",
        summary: "Organize an application pack so staff can focus on assessment instead of searching through attachments.",
        inputs: "Approved document requirements, submitted application materials and the existing case record.",
        review: "An authorized employee checks completeness, resolves inconsistencies and retains responsibility for any lending decision.",
        outcome: "A structured summary, a missing-information checklist and references to the original documents.",
      },
      {
        title: "Policy and procedure knowledge",
        summary: "Help employees answer operational questions from the versions of policy they are permitted to access.",
        inputs: "Approved procedures, internal guidance, source ownership and access rules for each team.",
        review: "The employee checks the cited guidance and routes ambiguous or exceptional cases to the policy owner.",
        outcome: "An inspectable answer with source references and a clear path for unresolved questions.",
      },
      {
        title: "Customer service preparation",
        summary: "Prepare useful context and a draft response for routine product or process questions.",
        inputs: "Approved service knowledge and the case information available to the assigned support team.",
        review: "The service employee verifies identity requirements, checks the draft and approves any customer-facing response.",
        outcome: "A suggested answer and a concise handover when a specialist needs to become involved.",
      },
      {
        title: "Operations and reconciliation review",
        summary: "Organize records and supporting documents into a consistent queue for operational review.",
        inputs: "The agreed record fields, supporting documents and rules used by the operations team.",
        review: "An accountable reviewer checks discrepancies and authorizes any change in the system of record.",
        outcome: "A review-ready case with extracted information, source links and highlighted exceptions.",
      },
    ],
    processTitle: "From an application pack to a prepared review.",
    processContext: "An illustrative document-preparation workflow. Credit assessment and approval remain with the authorized banking team.",
    process: [
      { title: "Collect the pack", description: "Bring the submitted documents and case reference into the agreed workflow." },
      { title: "Check the requirements", description: "Compare the materials with the approved checklist and link each finding to its source." },
      { title: "Review the gaps", description: "A staff member checks missing information and any conflicting details." },
      { title: "Prepare the next step", description: "Return the reviewed summary to the case owner for their decision." },
    ],
    controlIntro: "Define the boundaries of the first workflow before connecting sensitive banking information.",
    controls: [
      { title: "Role-based source scope", description: "Agree which records and policy sources each role may access, and how those permissions are enforced." },
      { title: "A named decision owner", description: "Keep credit, eligibility and customer-account decisions with the people authorized to make them." },
      { title: "Evidence for review", description: "Define the references, review records and retention requirements that the workflow needs to preserve." },
    ],
    visual: { title: "Application preparation", reference: "Banking operations", steps: ["Document pack", "Policy sources", "Staff review"] },
    relatedSlugs: ["insurance", "telecommunication"],
  },
  {
    slug: "telecommunication",
    title: "Telecommunications",
    seoTitle: "AI for Telecommunications",
    description: "Explore Century for telecom service knowledge, fault triage, billing questions and clearer handovers between support teams.",
    eyebrow: "Century for telecommunications",
    headline: ["Keep the context.", "Move the request forward."],
    intro: "Connect the information behind a service request with the team that can resolve it. Explore focused workflows for troubleshooting, billing and consistent customer communication.",
    goalsTitle: "A clearer connection between your teams.",
    goals: [
      { title: "Reduce repeated questions", description: "Capture the reported issue and completed steps so customers do not need to repeat the same context." },
      { title: "Support consistent answers", description: "Prepare responses from approved service knowledge and the relevant version of a procedure." },
      { title: "Make handovers useful", description: "Give specialists a structured case with what is known, what was tried and what remains unresolved." },
    ],
    workflows: [
      {
        title: "Fault triage and troubleshooting",
        summary: "Help a service team collect the symptoms and find the approved next troubleshooting step.",
        inputs: "Reported symptoms, approved service guides and the diagnostic information within the agreed scope.",
        review: "An authorized operator checks the recommendation and decides whether a specialist or field team is needed.",
        outcome: "A structured case containing the issue, completed checks and the reason for escalation.",
      },
      {
        title: "Service changes and account requests",
        summary: "Prepare routine requests against the current process and the information the service team can access.",
        inputs: "The customer's request, approved product guidance and required identity or authorization checks.",
        review: "A service employee validates the request and approves changes through the established account process.",
        outcome: "A complete request or a clear list of information needed before the team can proceed.",
      },
      {
        title: "Billing assistance",
        summary: "Help staff explain a bill using verified information and prepare disputed cases for review.",
        inputs: "Approved billing explanations, relevant invoice fields and permitted case history.",
        review: "The billing team checks the explanation and decides how to handle disputed amounts or adjustments.",
        outcome: "A draft answer with supporting context, or a prepared case for the billing specialist.",
      },
      {
        title: "Incident communication",
        summary: "Prepare consistent service messages from information approved by the incident owner.",
        inputs: "Verified incident updates, affected service information and approved communication templates.",
        review: "The incident or communication owner confirms the wording, audience and timing before a message is issued.",
        outcome: "A reviewed communication draft and a reusable context pack for support teams.",
      },
    ],
    processTitle: "From a reported fault to a useful handover.",
    processContext: "An illustrative support workflow. Diagnosis, network changes and field dispatch follow your existing authorization process.",
    process: [
      { title: "Capture the request", description: "Record the reported issue and the information the customer has already supplied." },
      { title: "Find the guidance", description: "Retrieve the approved troubleshooting procedure and relevant source references." },
      { title: "Review the case", description: "A service employee checks the context and identifies the next responsible team." },
      { title: "Hand over with context", description: "Pass the issue, completed checks and outstanding questions together." },
    ],
    controlIntro: "Keep service support within the limits of the information and actions approved for each team.",
    controls: [
      { title: "Verified service information", description: "Define which guides, incident updates and product information are authoritative for the workflow." },
      { title: "Controlled system actions", description: "Set explicit approval points before account changes, network actions or external communication." },
      { title: "Clear escalation paths", description: "Agree how unresolved requests reach billing, technical support or field operations with sufficient context." },
    ],
    visual: { title: "Service request preparation", reference: "Telecom support", steps: ["Reported issue", "Approved guidance", "Service review"] },
    relatedSlugs: ["utilities", "retail"],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    seoTitle: "AI for Healthcare",
    description: "Explore Century for equipment documentation, quality procedures and operational knowledge, with role-based access, source versions and expert review",
    eyebrow: "Century for healthcare",
    headline: ["Less administrative friction.", "More time for people."],
    intro: "Support the work around care with accessible procedures, organized documents and clearer handovers. Begin with a defined administrative process and the professionals responsible for it.",
    goalsTitle: "Make everyday coordination easier.",
    goals: [
      { title: "Find approved procedures", description: "Help authorized staff locate the operational guidance they need and inspect the original source." },
      { title: "Prepare complete information", description: "Identify gaps in administrative records before a request passes to the next team." },
      { title: "Keep review with professionals", description: "Make proposed summaries and next steps clear enough for an accountable person to check." },
    ],
    workflows: [
      {
        title: "Administrative knowledge",
        summary: "Help staff answer procedural questions from approved internal knowledge and service guidance.",
        inputs: "Operational procedures, staff guidance and the access permissions for each source.",
        review: "The staff member checks the relevant reference and routes uncertain questions to the process owner.",
        outcome: "An answer linked to approved guidance, with unresolved questions made explicit.",
      },
      {
        title: "Scheduling and referral preparation",
        summary: "Organize the information an administrative team needs to handle an appointment or referral request.",
        inputs: "The submitted request, required administrative fields and approved scheduling procedures.",
        review: "An authorized staff member verifies the information and handles scheduling or routing through existing systems.",
        outcome: "A complete request or a checklist of missing information for the relevant team.",
      },
      {
        title: "Document and record preparation",
        summary: "Prepare a source-linked draft summary for an authorized professional to inspect.",
        inputs: "Only the records and document types explicitly approved for the workflow and reviewer.",
        review: "The responsible professional checks the source material. Clinical interpretation and decisions remain with qualified staff.",
        outcome: "A reviewed working summary with references, rather than an independent diagnosis or treatment recommendation.",
      },
      {
        title: "Procurement and internal service requests",
        summary: "Bring structure to recurring supplier, invoice and internal support work.",
        inputs: "Supplier documents, invoice fields, internal service knowledge and the agreed review rules.",
        review: "The procurement, finance or internal-service owner checks exceptions and approves the next action.",
        outcome: "A prepared review queue with extracted information and supporting evidence.",
      },
    ],
    processTitle: "From a referral request to an organized handover.",
    processContext: "An illustrative administrative workflow. It does not make clinical decisions or determine a person's entitlement to care.",
    process: [
      { title: "Receive the request", description: "Collect the administrative information permitted for the process." },
      { title: "Check completeness", description: "Compare the request with the required fields and approved procedure." },
      { title: "Review the information", description: "An authorized staff member resolves omissions and checks the prepared summary." },
      { title: "Coordinate the next step", description: "Hand the reviewed request to the team responsible for scheduling or follow-up." },
    ],
    controlIntro: "Scope access, processing and review responsibilities around the sensitivity of healthcare information.",
    controls: [
      { title: "Minimum necessary access", description: "Identify the specific records and fields required for the process, and limit access to authorized roles." },
      { title: "Professional responsibility", description: "Keep clinical interpretation, prioritization and decisions under the control of qualified personnel." },
      { title: "Deployment-specific requirements", description: "Agree processing location, retention and contractual requirements before connecting health-related information." },
    ],
    visual: { title: "Referral coordination", reference: "Healthcare administration", steps: ["Request details", "Approved procedure", "Staff review"] },
    relatedSlugs: ["insurance", "utilities"],
  },
  {
    slug: "utilities",
    title: "Utilities",
    seoTitle: "AI for Utilities",
    description: "Explore Century workflows for utility service requests, connections, operational knowledge and billing support with accountable review.",
    eyebrow: "Century for utilities",
    headline: ["Connect the information.", "Support the operation."],
    intro: "Bring service requests, document requirements and operational knowledge into a clearer workflow. Help teams prepare the information they need to take the next authorized step.",
    goalsTitle: "Give each request a clearer path forward.",
    goals: [
      { title: "Prepare complete requests", description: "Collect the relevant information before a service or connection case passes between teams." },
      { title: "Make guidance accessible", description: "Help staff find approved operating procedures and understand which source supports an answer." },
      { title: "Improve customer context", description: "Keep the request, supporting documents and outstanding questions together throughout a handover." },
    ],
    workflows: [
      {
        title: "Service-request coordination",
        summary: "Prepare the context needed to route a routine customer or site request.",
        inputs: "Submitted request details, approved service categories and the process owner's routing rules.",
        review: "An authorized operator checks the classification and decides which team should handle the request.",
        outcome: "A structured case with relevant context and the information still needed to proceed.",
      },
      {
        title: "Connection documentation",
        summary: "Help teams assemble and check the document pack for a new connection or change request.",
        inputs: "Approved requirements, submitted site documents and the relevant case reference.",
        review: "The connection team checks the pack and retains responsibility for technical assessment and approval.",
        outcome: "A checklist of supplied and missing information, with links to the supporting documents.",
      },
      {
        title: "Field-team knowledge and handovers",
        summary: "Locate approved procedures and organize the information that field staff need to review.",
        inputs: "Current operating guidance, approved work information and role-based source permissions.",
        review: "The responsible operator verifies the procedure and follows established safety and dispatch processes.",
        outcome: "A referenced knowledge response or a complete handover for the authorized field team.",
      },
      {
        title: "Billing and tariff assistance",
        summary: "Prepare explanations of routine billing questions from verified information.",
        inputs: "Approved tariff guidance, permitted invoice details and the customer's stated question.",
        review: "A billing specialist checks the proposed response and authorizes any adjustment through the existing process.",
        outcome: "A source-supported draft answer or an organized case for further review.",
      },
    ],
    processTitle: "From a connection request to a complete case.",
    processContext: "An illustrative document workflow. Engineering decisions, emergency response and dispatch remain within existing operational controls.",
    process: [
      { title: "Collect the documents", description: "Bring the submitted site information and request together." },
      { title: "Match the checklist", description: "Identify the applicable approved requirements and link the supporting evidence." },
      { title: "Review missing details", description: "A team member checks omissions and conflicting information." },
      { title: "Prepare the assessment", description: "Pass the reviewed case to the authorized connection or engineering team." },
    ],
    controlIntro: "Use AI to support operational work within the procedures, permissions and safety responsibilities already in place.",
    controls: [
      { title: "Approved operational sources", description: "Identify current procedures and their owners so the workflow can distinguish authoritative information." },
      { title: "Human-controlled operations", description: "Keep emergency handling, technical decisions and physical-system actions with authorized personnel." },
      { title: "Clear system boundaries", description: "Agree which data can be read and what requires approval before a record or service request changes." },
    ],
    visual: { title: "Connection request", reference: "Utility operations", steps: ["Site documents", "Requirements", "Operator review"] },
    relatedSlugs: ["telecommunication", "retail"],
  },
  {
    slug: "insurance",
    title: "Insurance",
    seoTitle: "AI for Insurance",
    description: "Explore Century for policy knowledge, submission preparation and claims documentation, with evidence and human review at each decision point.",
    eyebrow: "Century for insurance",
    headline: ["Move the paperwork.", "Keep the judgment."],
    intro: "Give insurance teams a more organized starting point for each case. Connect documents and policy knowledge with clear review steps and accountable decision-making.",
    goalsTitle: "More clarity before a case reaches its reviewer.",
    goals: [
      { title: "Surface missing information", description: "Check submission and claim documents against the requirements agreed for the workflow." },
      { title: "Make policy wording inspectable", description: "Help staff find the relevant source and version when preparing a response." },
      { title: "Support consistent review", description: "Prepare the evidence and exceptions in a common format for the responsible specialist." },
    ],
    workflows: [
      {
        title: "Submission preparation",
        summary: "Extract and organize application information before an underwriting specialist reviews it.",
        inputs: "Submitted documents, required fields and the approved preparation checklist.",
        review: "The authorized specialist verifies the extracted information and makes any underwriting or eligibility decision.",
        outcome: "A prepared submission with missing fields and source references made visible.",
      },
      {
        title: "Policy and service knowledge",
        summary: "Prepare answers to policy-process questions using the approved wording and internal guidance.",
        inputs: "Policy documents, servicing procedures, source versions and the employee's access permissions.",
        review: "The service specialist checks the relevant wording and escalates ambiguity or exceptions.",
        outcome: "A suggested response linked to its source material, ready for staff review.",
      },
      {
        title: "Claims intake and documentation",
        summary: "Bring submitted evidence and case details into an organized starting point for a claims reviewer.",
        inputs: "Claim materials, the required evidence checklist and the existing case reference.",
        review: "A claims professional checks the summary and retains responsibility for coverage, liability and settlement decisions.",
        outcome: "A source-linked case summary and a list of information that still needs to be collected.",
      },
      {
        title: "Internal review and exception routing",
        summary: "Prepare supporting evidence when a case requires an additional operational or policy review.",
        inputs: "Agreed review criteria, permitted case records and the exception-routing procedure.",
        review: "The accountable owner checks the evidence and approves the response or next step.",
        outcome: "A structured review record with the question, relevant sources and unresolved issues.",
      },
    ],
    processTitle: "From submitted evidence to a prepared claim file.",
    processContext: "An illustrative claims-administration workflow. Coverage, liability, entitlement and payout decisions remain with authorized professionals.",
    process: [
      { title: "Receive the evidence", description: "Collect the documents included in the agreed claims-intake scope." },
      { title: "Organize the case", description: "Extract the required information and identify the source of each finding." },
      { title: "Review the gaps", description: "A claims professional checks the summary and requests missing material." },
      { title: "Prepare the decision file", description: "Pass the reviewed evidence to the authorized decision-maker." },
    ],
    controlIntro: "Set clear boundaries between administrative assistance and the professional judgment an insurance case requires.",
    controls: [
      { title: "Policy-version awareness", description: "Define which policy wording and procedures apply to the workflow and how changes are reviewed." },
      { title: "Accountable case decisions", description: "Keep underwriting, coverage, liability and payment decisions within the insurer's authorized review process." },
      { title: "Traceable source material", description: "Preserve the links between extracted information, source documents and the reviewer-approved next step." },
    ],
    visual: { title: "Claims file preparation", reference: "Insurance operations", steps: ["Submitted evidence", "Policy wording", "Claims review"] },
    relatedSlugs: ["banking", "healthcare"],
  },
  {
    slug: "retail",
    title: "Retail",
    seoTitle: "AI for Retail",
    description: "Explore Century for retail service knowledge, supplier documents, store procedures and reviewed customer-support workflows.",
    eyebrow: "Century for retail",
    headline: ["Everyday operations.", "Working together."],
    intro: "Help store, service and back-office teams work from the same approved information. Start with a focused process that connects a request to a useful, reviewed next step.",
    goalsTitle: "Make useful information easier to put to work.",
    goals: [
      { title: "Support consistent service", description: "Prepare responses using current product and service policies across the teams involved." },
      { title: "Give associates clear guidance", description: "Help employees find approved procedures without searching through disconnected documents." },
      { title: "Organize back-office work", description: "Prepare supplier and invoice information for the people responsible for checking it." },
    ],
    workflows: [
      {
        title: "Order and returns support",
        summary: "Prepare a useful response to routine order, delivery and returns questions.",
        inputs: "Approved service policies, permitted order information and the customer's request.",
        review: "The service team checks the response and approves refunds or order changes through the existing process.",
        outcome: "A suggested answer or a handover containing the issue and relevant order context.",
      },
      {
        title: "Store and associate knowledge",
        summary: "Help staff locate approved operating procedures and product information.",
        inputs: "Store procedures, training guidance and product information with named source owners.",
        review: "The associate checks the source and escalates questions that fall outside the approved guidance.",
        outcome: "An inspectable answer that points back to the relevant procedure or product document.",
      },
      {
        title: "Supplier and invoice preparation",
        summary: "Extract the information a procurement or finance team needs to review supplier documents.",
        inputs: "Invoices, purchase references and the team's agreed matching and review requirements.",
        review: "The responsible employee checks discrepancies and authorizes any supplier-record change or payment.",
        outcome: "A prepared review queue with document references and exceptions highlighted.",
      },
      {
        title: "Product and campaign preparation",
        summary: "Bring approved product facts and campaign requirements together before content is published.",
        inputs: "Current product records, approved claims, campaign requirements and channel guidance.",
        review: "A marketing or product owner checks the facts, wording and publication requirements.",
        outcome: "A reviewed content draft with the source information available to the publishing team.",
      },
    ],
    processTitle: "From a supplier invoice to a prepared review.",
    processContext: "An illustrative procurement workflow. Supplier approval, record changes and payment authorization remain with your team.",
    process: [
      { title: "Collect the invoice", description: "Bring the supplier document and purchase reference into the defined workflow." },
      { title: "Prepare the information", description: "Extract the required fields and link them to the original document." },
      { title: "Review exceptions", description: "A team member checks missing references or inconsistent details." },
      { title: "Move the case forward", description: "Return the reviewed information to the procurement or finance owner." },
    ],
    controlIntro: "Keep service, commercial information and operational changes within clearly defined review boundaries.",
    controls: [
      { title: "Approved customer-facing facts", description: "Define the product, pricing and policy sources a workflow may use when preparing an answer." },
      { title: "Human approval for actions", description: "Set review points before refunds, supplier changes, payments or campaign publication." },
      { title: "A scope that fits your systems", description: "Agree the necessary order, product or procurement interfaces before promising a connected workflow." },
    ],
    visual: { title: "Supplier document review", reference: "Retail operations", steps: ["Invoice details", "Order reference", "Team review"] },
    relatedSlugs: ["telecommunication", "airlines"],
  },
  {
    slug: "airlines",
    title: "Airlines",
    seoTitle: "AI for Airlines",
    description: "Explore Century for airline service knowledge, disruption communication and claims-document preparation with source references and staff review.",
    eyebrow: "Century for airlines",
    headline: ["When plans change,", "keep the context clear."],
    intro: "Help service teams find approved information and prepare the next step with the relevant context. Explore workflows for passenger questions, disruption support and documentation.",
    goalsTitle: "Help the next team start with the full picture.",
    goals: [
      { title: "Make policy easier to inspect", description: "Prepare answers from approved travel and service guidance with references a staff member can check." },
      { title: "Improve disruption handovers", description: "Keep verified journey information, the request and completed actions together." },
      { title: "Prepare complete case files", description: "Organize supporting documents before a claim or service exception reaches its reviewer." },
    ],
    workflows: [
      {
        title: "Passenger service knowledge",
        summary: "Help staff prepare responses to routine travel, baggage and service-policy questions.",
        inputs: "Approved service guidance, policy versions and the information permitted for the request.",
        review: "The service employee checks the source and verifies any customer-specific information before responding.",
        outcome: "A suggested answer with policy references and a clear escalation when guidance is insufficient.",
      },
      {
        title: "Disruption communication and handovers",
        summary: "Organize verified information and prepare communication for a service team to review.",
        inputs: "Approved operational updates, the passenger's stated request and permitted journey context.",
        review: "The authorized team confirms the information and approves any communication, rebooking or refund action.",
        outcome: "A reviewed draft or a case handover containing what is known and what still needs a decision.",
      },
      {
        title: "Claims and supporting documents",
        summary: "Prepare the evidence and relevant references for a staff member to examine a claim.",
        inputs: "Submitted documents, approved claims guidance and the information required by the review process.",
        review: "An authorized specialist checks the case and determines entitlement, compensation or other action.",
        outcome: "An organized case summary with missing evidence and source references made visible.",
      },
      {
        title: "Internal operational knowledge",
        summary: "Help authorized employees locate current internal procedures and prepare cross-team handovers.",
        inputs: "Approved operating guidance, source ownership and permissions appropriate to each role.",
        review: "The responsible employee checks the procedure and follows established operational and safety controls.",
        outcome: "A source-linked knowledge response or a prepared handover for the appropriate team.",
      },
    ],
    processTitle: "From a disrupted journey to a prepared service case.",
    processContext: "An illustrative customer-service workflow. Operational control, passenger entitlement and booking changes stay with authorized teams.",
    process: [
      { title: "Capture the situation", description: "Record the service request and the verified context available to the team." },
      { title: "Find the right guidance", description: "Retrieve the approved service policy and the relevant source references." },
      { title: "Review the options", description: "A staff member checks the prepared information and decides the next authorized step." },
      { title: "Keep the handover complete", description: "Pass the reviewed case and any unresolved questions to the next responsible team." },
    ],
    controlIntro: "Separate assistance with information from the operational and customer decisions your authorized teams control.",
    controls: [
      { title: "Verified operational context", description: "Define which updates and service-policy sources are authoritative and how their currency is checked." },
      { title: "Controlled customer actions", description: "Require the appropriate authorization before booking changes, refunds or decisions about entitlement." },
      { title: "Role-specific knowledge", description: "Limit internal guidance and passenger information to the employees and workflows permitted to use them." },
    ],
    visual: { title: "Passenger service preparation", reference: "Airline service teams", steps: ["Journey context", "Service policy", "Agent review"] },
    relatedSlugs: ["retail", "insurance"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
