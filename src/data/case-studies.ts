// Case study content. Text comes from the Framer site; the Mailchimp study
// uses the wording from the live linseyfox.com page. Media blocks without a
// `src` render as labelled placeholders until the original images are added.

export type ListItem = string | { lead: string; text: string };

export type Block =
  | { t: "statement"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "leadp"; lead: string; text: string }
  | { t: "note"; text: string }
  | { t: "list"; items: ListItem[] }
  | { t: "numbered"; items: { n: string; title: string; text: string }[] }
  | { t: "stats"; items: { value: string; label: string }[] }
  | { t: "callout"; label: string; title: string; text: string }
  | { t: "media"; caption: string; count?: number; src?: string[]; alts?: string[]; labels?: string[]; carousel?: boolean; scroll?: boolean; narrow?: boolean; zoom?: boolean; captions?: string[] }
  | { t: "laptop"; src: string; alt: string; caption: string }
  | { t: "video"; vimeoId: string; caption: string; ratio?: number }
  | { t: "figma"; src: string; caption: string };

export type Section = {
  id: string; // anchor used by the jump links, e.g. #problem
  nav: string; // label in the jump-link list
  heading: string; // section heading
  blocks: Block[];
};

export type CaseStudy = {
  slug: string;
  plate: string; // "Pl. I"
  company: string;
  kicker: string; // "Intuit Mailchimp · Messaging & billing"
  title: string;
  dek: string;
  meta: { label: string; value: string }[];
  hero?: string; // path in /public/work, when provided
  heroCaption: string;
  sections: Section[];
};

const FIGMA_DEV_HUB =
  "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FMKil1OTOmMlAI57VRybeIczY%2FPortfolio%3Fnode-id%3D863-134145%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D863%253A75857%26starting-point-node-id%3D863%253A134145%26hide-ui%3D1";

export const caseStudies: CaseStudy[] = [
  // ------------------------------------------------------------------ I
  {
    slug: "enterprise-sms",
    plate: "Pl. I",
    company: "Intuit Mailchimp",
    kicker: "Intuit Mailchimp · Messaging & billing",
    title: "Designing an Intuit Mailchimp enterprise messaging plan experiment",
    dek: "How I took a complex new messaging plan and made the experience simple.",
    meta: [
      { label: "Role", value: "Lead and sole product designer" },
      { label: "Team", value: "Product manager, front-end engineer" },
      { label: "Status", value: "Handed off August 2026" },
    ],
    hero: "/work/enterprise-sms/final-2-manage-plan.webp",
    heroCaption: "Final “Manage plan” design in a laptop mockup",
    sections: [
      {
        id: "problem",
        nav: "Problem & goals",
        heading: "Problem & goals",
        blocks: [
          { t: "statement", text: "Mailchimp’s mid-market enterprise customers face billing unpredictability and pauses in service" },
          { t: "p", text: "Intuit Mailchimp customers that send high volumes of SMS marketing messages are subject to manual credit top-offs and per-event credit card charges that can fire multiple times per day during high-send periods. This makes it impossible to accurately forecast monthly messaging costs. Failed charges can trigger send pauses, directly damaging campaign performance and customer trust in the platform." },
          { t: "h3", text: "Problem" },
          { t: "p", text: "Mid-market customers using SMS today are subject to manual credit top-offs and per-event credit card charges that can fire multiple times per day during high-send periods. This makes it impossible to accurately forecast monthly messaging costs. Failed charges can trigger SMS sending pauses, directly damaging campaign performance and customer trust in the platform." },
          { t: "h3", text: "Hypothesis" },
          { t: "p", text: "If we launch a unified SMS enterprise plan with balance-due based billing and consistent overage logic, then mid-market customers will adopt SMS at higher rates, billing-related churn and support burden will decrease, and our sales team will win more SMS-specific deals that were previously out of reach." },
          { t: "h3", text: "Design goals" },
          { t: "p", text: "I used Claude to help refine the project requirements for design-specific tasks. The requirement briefs are written for all teams (design, engineering, product, analytics) as one source of truth. It’s often difficult to tease out what’s needed for a design MVP. With Claude’s plain language output, I found several more areas that required designs vs. what was originally pitched. The full scope included:" },
          { t: "list", items: ["Custom SMS enterprise purchase & upgrade flows", "Platform-wide UI cleanup & state management", "Gated visibility", "Contextual upsell & discoverability"] },
          { t: "h3", text: "Key performance indicators" },
          { t: "p", text: "Success will be a measurable increase in SMS adoption rate among eligible mid-market accounts, growth in SMS adoption, and reduction in billing-related support tickets within 6 months of broad rollout." },
          { t: "p", text: "As measured by" },
          { t: "list", items: ["SMS adoption rate (%)", "SMS monthly recurring revenue from mid-market", "Win rate (%) for SMS-led sales deals"] },
          { t: "h3", text: "My role" },
          { t: "p", text: "I was lead and sole product designer overseeing the project from discovery, to concepts, to content design, to final design delivery. The team included a product manager and a front-end engineer." },
        ],
      },
      {
        id: "discovery",
        nav: "Discovery",
        heading: "Discovery",
        blocks: [
          { t: "h3", text: "Current experience audit" },
          { t: "p", text: "Currently a customer can view their SMS plan and make edits only to publicly available plans. The enterprise SMS plan is a sales-led experiment that’s not currently available in the product experience." },
          { t: "video", vimeoId: "1219312353", caption: "Current “Manage credits” experience walkthrough", ratio: 1.136 },
          { t: "note", text: "The current experience limits the changes a user can make in their messaging plan." },
          { t: "h3", text: "Opportunities identified based on product knowledge" },
          { t: "p", text: "There are several areas identified within the product experience that aren’t called out in the brief which must be addressed for a cohesive user experience." },
          { t: "list", items: [
            "How is this experience different from a current offer for auto-refill?",
            "What happens when a user hits their SMS credit limit while building an SMS? Will they be notified that overages will begin if they proceed?",
            "When creating an email, the user’s prompted to also send an SMS. When at their credit limit, will they be notified that overages will begin if they proceed?",
            "Will there be product-triggered emails to notify users that overage pricing is now in effect through the end of their billing cycle?",
            "What are all the ways in which a user might try to understand what they’ll be charged on the next billing cycle?",
            "If the user does a web search and lands on a Mailchimp help article about overages, will this article be updated to reflect the enterprise plan info?",
          ] },
        ],
      },
      {
        id: "ideation",
        nav: "Ideation",
        heading: "Ideation",
        blocks: [
          {
            t: "media",
            caption: "Ideation screens",
            carousel: true,
            src: [
              "/work/enterprise-sms/ideation-1-sms-registration.webp",
              "/work/enterprise-sms/ideation-2-manage-credits-pending.webp",
              "/work/enterprise-sms/ideation-3-monthly-plans-and-credits.webp",
            ],
            alts: [
              "SMS registration flow, credit subscription step: “You’re so close, let’s confirm your credits” with a custom Enterprise plan of 750,000 credits for $3,500 a month, shown on a laptop",
              "Manage credits screen with a pending Enterprise SMS plan taking effect August 1, 2026, listing what’s changing, shown on a laptop",
              "Monthly plans and credits billing page showing a Premium marketing plan, a paid messaging plan and a cost estimate, shown on a laptop",
            ],
          },
          { t: "h3", text: "What guided my choices" },
          { t: "p", text: "There are several functions I wanted the user to be able to achieve on the revised plan page, which drove the design ideation." },
          { t: "p", text: "First, I changed the page link and name from “Manage credits” to “Manage plan” as the ability to adjust the plan credits is now the option to change the plan itself." },
          { t: "p", text: "Next, I removed the current functionality allowing the user to buy top-off credits—now no longer needed in the enterprise messaging plan." },
          { t: "p", text: "Third, I made the primary call-to-action the option to talk to a sales expert if the plan they selected wasn’t the right fit." },
          { t: "p", text: "Finally, I created a way for the user to switch from their sales-enable plan option back to a publicly available plan." },
          { t: "p", text: "Each of these items requires simple and clear communication, with different destinations." },
        ],
      },
      {
        id: "prototype",
        nav: "Prototype",
        heading: "Prototype",
        blocks: [{ t: "video", vimeoId: "1219368555", caption: "Prototype walkthrough", ratio: 1.179 }],
      },
      {
        id: "final",
        nav: "Final designs",
        heading: "Final designs",
        blocks: [{
            t: "media",
            caption: "Final designs",
            carousel: true,
            src: [
              "/work/enterprise-sms/final-1-plans-and-credits-manage-menu.webp",
              "/work/enterprise-sms/final-2-manage-plan.webp",
              "/work/enterprise-sms/final-3-change-to-self-service-plan.webp",
              "/work/enterprise-sms/final-4-select-credit-amount.webp",
              "/work/enterprise-sms/final-5-credit-amount-menu.webp",
              "/work/enterprise-sms/final-6-confirm-plan.webp",
              "/work/enterprise-sms/final-7-plan-change-scheduled.webp",
              "/work/enterprise-sms/final-8-confirmation-email.webp",
              "/work/enterprise-sms/final-9-plan-change-canceled.webp",
            ],
            alts: [
              "Monthly plans and credits billing page with the Manage menu open on the messaging plan, showing Manage plan and Cancel plan, shown on a laptop",
              "Manage plan screen for the Enterprise plan: 750,000 credits a month for $3,500, with options to talk to sales or switch to a self-service plan, shown on a laptop",
              "Change to self-service plan dialog telling the customer to call the sales team or contact support to keep custom Enterprise pricing, shown on a laptop",
              "Select and confirm plan screen with an empty credit amount menu and a plan estimate, shown on a laptop",
              "Select and confirm plan screen with the credit amount menu open, listing options from 1,000 to 20,000 credits, shown on a laptop",
              "Select and confirm plan screen with 1,000 credits for $20 selected, the acknowledgment checked and the Confirm button enabled, shown on a laptop",
              "Monthly plans and credits page with a Plan change scheduled banner and a Cancel change button, shown on a laptop",
              "Email titled “Your plan change is confirmed” open in an inbox, with a View plan button, shown on a laptop",
              "Monthly plans and credits page with a confirmation message, “Plan change successfully canceled!”, shown on a laptop",
            ],
          }],
      },
      {
        id: "results",
        nav: "Results & learnings",
        heading: "Results & learnings",
        blocks: [
          { t: "h3", text: "Results" },
          { t: "p", text: "This project was handed off at the end of my contract in August 2026. Currently awaiting results from former colleagues, once the experiment reaches statistical significance." },
          { t: "h3", text: "What I learned" },
          { t: "p", text: "When this project was pitched in kickoff, it was framed as a couple of minor screen updates. I knew when I understood the impact of the experiment that it would require many more updates than initially described." },
          { t: "p", text: "I was new to the Mailchimp app so I had blind spots. I met with a principal designer on our team who had been working exclusively on the Mailchimp app for years. She was able to help me find blindspots in the product requirements. If I had tried to design this project in a silo without consulting a subject matter expert, these blindspots would have been missed. When in doubt, ask for another pair of eyes." },
          { t: "p", text: "Using Claude to break down the product requirements into clear, digestible design goals was the first time I had tried this process. I found it really helpful and will use it going forward." },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ II
  {
    slug: "pricing-calculator",
    plate: "Pl. II",
    company: "Snowflake",
    kicker: "Snowflake · UX writing · Pricing",
    title: "UX writing & design for a pricing calculator on Snowflake.com",
    dek: "How I created the first Snowflake pricing calculator for complex information.",
    meta: [
      { label: "Role", value: "Sole UX & content designer" },
      { label: "Team", value: "UI / visual designer, lead engineer + 4 offshore engineers, project manager, pricing stakeholders" },
      { label: "Status", value: "Still live in its original form" },
    ],
    hero: "/work/snowflake-pricing-calculator/hero.webp",
    heroCaption: "Snowflake pricing calculator, shown on a laptop and a phone",
    sections: [
      {
        id: "problem",
        nav: "Problem & goals",
        heading: "Problem & goals",
        blocks: [
          { t: "statement", text: "Snowflake users need a way to accurately estimate their spending — and none of the existing calculators came from the company" },
          { t: "p", text: "Snowflake has a perception problem of being an expensive tool. Part of the marketing strategy is to create visibility so customers understand what we charge. A few calculators already existed on the web, but this effort was the first of its kind: a pricing calculator on the Snowflake.com marketing website." },
          { t: "h3", text: "Problem" },
          { t: "p", text: "Estimating Snowflake platform cost can be daunting with the current resources available to customers, including a complex consumption table and an outdated pricing guide. We need a way for users to immediately calculate what they might spend given their needs." },
          { t: "h3", text: "Hypothesis" },
          { t: "p", text: "By launching a pricing calculator on the Snowflake.com marketing website, more sales meetings will be booked. We also anticipate positive community sentiment around Snowflake providing pricing transparency." },
          { t: "h3", text: "Design goals" },
          { t: "p", text: "In addition to designing the pricing calculator, I led these pricing updates in tandem:" },
          { t: "list", items: [
            "Conduct a UX audit of the current pricing page",
            "Revise the pricing page content and hierarchy for improved readability, meeting users where they are in their journey",
            "Update the pricing sub-navigation to create a clear path to related pages",
            "Refine the content design for a more modern, clean and clear user experience",
          ] },
          { t: "h3", text: "Key performance indicators" },
          { t: "list", items: ["Increase in sales contact form completion", "Increase time on site and page views per session", "Reduce website bounce rate"] },
          { t: "h3", text: "My role" },
          { t: "p", text: "I served as the sole UX & content designer, overseeing the project from discovery, to low-fidelity concepts, to UX writing. The team included a UI / visual designer, a lead engineer plus an offshore team of 4 engineers, a project manager, and the pricing stakeholder team." },
        ],
      },
      {
        id: "discovery",
        nav: "Discovery",
        heading: "Discovery",
        blocks: [
          { t: "h3", text: "Current experience audit" },
          { t: "p", text: "There wasn’t a calculator on the Snowflake website, but there was an existing pricing section." },
          {
            t: "laptop",
            caption: "The existing Snowflake pricing page",
            src: "/work/snowflake-pricing-calculator/old-pricing-page.webp",
            alt: "Full-length screenshot of the existing Snowflake pricing page: edition cards for Standard, Enterprise, Business Critical and Virtual Private Snowflake, storage pricing, a comparison with other vendors, resource links and a migration banner",
          },
          { t: "h3", text: "Opportunities identified in discovery" },
          { t: "list", items: [
            "Re-order the page hierarchy so more complex information is surfaced further in the journey",
            "Revise copywriting for improved readability and easier scanning",
            "Create a more robust sub-navigation that includes the calculator",
            "De-emphasize linking users off the page; instead, give them the content they’re seeking with limited marketing fluff",
          ] },
          { t: "h3", text: "Competitive analysis" },
          { t: "statement", text: "Pricing calculators on competitor sites are robust and complex" },
          { t: "p", text: "The other calculators I tested has pros and cons. It quickly became clear that ours would need to be complex — but the goal was always to keep it as simple as possible." },
          {
            t: "media",
            caption: "Competitor pricing calculators",
            carousel: true,
            scroll: true,
            src: ["databricks", "azure", "google-cloud", "aws"].map(
              (n) => `/work/snowflake-pricing-calculator/competitor-${n}.webp`,
            ),
            alts: [
              "Databricks pricing calculator with plan and cloud selectors, compute type fields, a monthly total and a table of supported instance types",
              "Azure pricing calculator with a product catalog, a cost estimate and detailed storage account options",
              "Google Cloud pricing calculator for Compute Engine with instance, machine type, memory and region settings and an estimated cost panel",
              "AWS pricing calculator configuring Amazon Data Firehose with location, source type, record and data ingestion fields",
            ],
          },
        ],
      },
      {
        id: "ideation",
        nav: "Ideation",
        heading: "Ideation",
        blocks: [
          { t: "statement", text: "Complex inputs, a simple path" },
          {
            t: "media",
            caption: "Ideation wireframes",
            carousel: true,
            scroll: true,
            src: ["1-compute-type-full-page", "2-compute-type-calculator", "3-annotated-wireframe"].map(
              (n) => `/work/snowflake-pricing-calculator/wireframe-${n}.webp`,
            ),
            alts: [
              "Full-page wireframe of the pricing calculator: provider, region and service edition, compute type, warehouse size, time in hours, storage, an estimate details panel, an add-ons section and a free trial banner",
              "Wireframe of the estimate calculator with example business sizes, the configuration form, an estimate details panel with a share button, and an add-ons form for AI services, function, model and tokens",
              "Annotated wireframe of the pricing calculator with notes explaining info icons, the add-ons behavior, an estimate details panel, a share link and more resources",
            ],
          },
        ],
      },
      {
        id: "writing",
        nav: "UX writing",
        heading: "UX writing",
        blocks: [
          { t: "statement", text: "One way to make a complex workflow simple is with clear, concise information — in the moment it’s needed" },
          { t: "p", text: "Since a goal for the calculator was to make it as simple as could be, we adopted the idea of adding tooltips for each input. They were designed to be unobtrusive and to meet the user where they are. I wrote the tooltips for each input, along with the content design for the full experience." },
          { t: "video", vimeoId: "1146403722", caption: "Pricing calculator UX writing", ratio: 1.905 },
          {
            t: "media",
            caption: "Calculator inputs with tooltips open",
            zoom: true,
            src: ["/work/snowflake-pricing-calculator/calculator-tooltips-open.webp"],
            alts: ["Snowflake pricing calculator prototype with a tooltip open beside each input in the four steps: provider, region and service edition; compute type, warehouse size and time; storage; and add-ons, next to a cost estimate panel"],
          },
        ],
      },
      {
        id: "prototype",
        nav: "Final design prototype",
        heading: "Final design prototype",
        blocks: [
          { t: "h3", text: "Final design prototype" },
          { t: "p", text: "A limited Figma prototype helped gain approvals and excitement internally. It also reduced engineering questions from the offshore development team building it from scratch." },
          { t: "video", vimeoId: "1097702353", caption: "Snowflake pricing calculator prototype", ratio: 1.217 },
          { t: "h3", text: "Phase two designs" },
          { t: "p", text: "During extensive internal interviews, the topic of pre-selected business sizes came up frequently. Due to timelines we couldn’t launch with this feature, but the designs are ready for a fast phase-two follow-up. I also added subhead copy below each step to give further context without having to open a tooltip." },
          {
            t: "media",
            caption: "Phase two design with pre-selected business sizes",
            carousel: true,
            scroll: true,
            src: ["/work/snowflake-pricing-calculator/phase2-starter-packs-full-page.webp"],
            alts: [
              "Full-page phase two design of the pricing calculator with a new first step, Choose your business size, then provider and edition, compute, storage, AI features and add-ons, next to a cost estimate panel",
            ],
          },
        ],
      },
      {
        id: "pricing-page",
        nav: "Revised pricing page",
        heading: "Revised pricing page",
        blocks: [
          {
            t: "media",
            caption: "The Snowflake pricing page, before and after",
            captions: [
              "Before: the existing pricing page",
              "After. What changed? A streamlined hero section gets the user to the pricing faster. The content is redesigned to be more scannable and digestible.",
            ],
            carousel: true,
            scroll: true,
            src: [
              "/work/snowflake-pricing-calculator/old-pricing-page.webp",
              "/work/snowflake-pricing-calculator/revised-pricing-page.webp",
            ],
            alts: [
              "The existing Snowflake pricing page before the revision: edition cards for Standard, Enterprise, Business Critical and Virtual Private Snowflake, storage pricing, a comparison with other vendors, resource links and a migration banner",
              "The revised Snowflake pricing page: a shorter edition comparison, on-demand and capacity storage options, a fully managed product section, resources, FAQs and a contact sales form",
            ],
          },
        ],
      },
      {
        id: "results",
        nav: "Results & thoughts",
        heading: "Final results & thoughts",
        blocks: [
          { t: "h3", text: "Still live, in its original form" },
          { t: "p", text: "The calculator launched after my departure, so unfortunately I don’t have results to share. I can say that it’s still live in its original form today — which speaks volumes." },
          { t: "statement", text: "This is the most rewarding UX design project I’ve done to date." },
          { t: "p", text: "At the onset, the complexity of the requirements was daunting due to layers of dependencies. In partnership with a great team who each brought our expertise to the table, we designed a simple and sleek product. Designing it from an outsider’s perspective ultimately became an asset, as my goal was always to keep it as simple as possible." },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ III
  {
    slug: "developers-hub",
    plate: "Pl. III",
    company: "Snowflake",
    kicker: "Snowflake · Developer experience",
    title: "Redesigning the developer experience on Snowflake.com",
    dek: "How I redesigned and elevated the developer experience on Snowflake’s marketing website.",
    meta: [
      { label: "Role", value: "Sole UX designer & researcher" },
      { label: "Team", value: "UI / visual designer, project manager, developer relations stakeholders" },
      { label: "Outcome", value: "94% increase in page views per month" },
    ],
    hero: "/work/developers-hub/hero.jpg",
    heroCaption: "Redesigned Snowflake for Developers page, shown on a laptop and a phone",
    sections: [
      {
        id: "problem",
        nav: "Problem & goals",
        heading: "Problem & goals",
        blocks: [
          { t: "statement", text: "Developer content lived on a different domain, with outdated and sparse information" },
          { t: "p", text: "Snowflake wants its users to know that developers are very important to their success. The website experience for developers wasn’t showing that importance." },
          { t: "p", text: "Developer content was housed on a different domain than Snowflake’s main website, the content was dated, and the design felt stale. To emphasize the importance of the developer community, Snowflake needed to make developers more prominent in the navigation and site domain, along with a fresh new experience to keep learning and discovering." },
          { t: "h3", text: "Problem" },
          { t: "p", text: "Developers are an important audience for Snowflake.com, but they weren’t being treated as such by the current web experience. Content was hard to find and disparate from the main Snowflake website, and making connections between content on different domains was a disconnect for the overall user experience." },
          { t: "h3", text: "Hypothesis" },
          { t: "p", text: "By migrating the developers website to the main Snowflake website, along with adding Developers to the global navigation, users will be more likely to discover, use and share content found within the updated developers site." },
          { t: "h3", text: "Design goals" },
          { t: "p", text: "In addition to the internal team goal of migrating the developers content to Snowflake.com, I had other improvements in mind:" },
          { t: "list", items: [
            "Through research, determine if adding “Developers” to the global navigation is a positive user experience for all site visitors",
            "Reduce the number of disparate links and one-off content types on the current developers home page",
            "Refine the design for a more modern, clean and clear experience for an audience with high expectations",
          ] },
          { t: "h3", text: "Key performance indicators" },
          { t: "list", items: ["Increase traffic to developer solutions", "Increase time on site and page views per session", "Reduce website bounce rate"] },
          { t: "h3", text: "My role" },
          { t: "p", text: "I served as the sole UX designer and researcher, overseeing the project from discovery, to concepts, to usability testing. The team included a UI / visual designer for polishing the final designs, a project manager, and the stakeholder team of developer relations managers." },
        ],
      },
      {
        id: "discovery",
        nav: "Discovery",
        heading: "Discovery",
        blocks: [
          { t: "h3", text: "Current experience audit" },
          { t: "p", text: "Developer content lived on a different domain and had its own navigation, look and feel." },
          {
            t: "media",
            caption: "Current developers site",
            carousel: true,
            scroll: true,
            src: [
              "/work/developers-hub/current-1-solution-page.webp",
              "/work/developers-hub/current-2-developers-home.webp",
              "/work/developers-hub/current-3-solutions-center.webp",
            ],
            alts: [
              "Full-page screenshot of a page on the current Snowflake developers site: the solution “Social graph of prominent tech figures using GraphRAG on RelationalAI”, with an overview, an architecture diagram and a row of hands-on resources",
              "Full-page screenshot of the current “Snowflake for Developers” home page, with a get-started section, a searchable and filterable resource list, and a next steps section",
              "Full-page screenshot of the current “Snowflake Solutions Center” page, with filters on the left and a grid of solution cards",
            ],
          },
          { t: "h3", text: "Opportunities identified in discovery" },
          { t: "list", items: ["Update the look and feel", "Make developer content easy to find", "Consolidate links and redesign how the information is displayed"] },
          { t: "h3", text: "Competitive analysis" },
          { t: "statement", text: "Developer sites have robust content for a technical audience" },
          { t: "p", text: "I looked at developer experiences for SaaS companies in a similar category to Snowflake. I found examples of what the technical developer audience needs and expects — for example, a left-hand side menu like GitHub. This discovery work helped determine the best way to display the content for this user type." },
          {
            t: "media",
            caption: "Competitor developer experiences",
            carousel: true,
            scroll: true,
            src: [
              "/work/developers-hub/competitor-1-confluent.webp",
              "/work/developers-hub/competitor-2-docker-hub.webp",
              "/work/developers-hub/competitor-3-hex.webp",
            ],
            alts: [
              "Full-page screenshot of Confluent’s “Streaming Use Case Architectures” page, with search and filter menus above a grid of use case cards",
              "Full-page screenshot of Docker Hub’s home page, with a category menu on the left and rows of featured and popular container images",
              "Full-page screenshot of Hex’s Snowpark templates page, with a category list on the left, a featured template and a grid of template cards",
            ],
          },
        ],
      },
      {
        id: "ideation",
        nav: "Ideation",
        heading: "Ideation",
        blocks: [
          { t: "statement", text: "Reusable templates designed to scale" },
          {
            t: "media",
            caption: "Wireframe templates",
            carousel: true,
            scroll: true,
            src: [
              "/work/developers-hub/template-1-individual-solution.webp",
              "/work/developers-hub/template-2-solutions-center.webp",
              "/work/developers-hub/template-3-solutions-category.webp",
            ],
            alts: [
              "Full-page wireframe of the individual solution template: a headline, summary and a media area at the top, a sidebar with dates and features used, an overview, a highlights box, three titled sections and a resources and docs list",
              "Full-page wireframe of the Solutions Center template: a page title, three featured solution cards, a filter sidebar and a grid of solution cards with pagination, followed by a continue learning section",
              "Full-page wireframe of a solution category template: a page title, a back link to all solutions, a topic filter and a grid of five solution cards, followed by a continue learning section",
            ],
          },
        ],
      },
      {
        id: "testing",
        nav: "Usability testing",
        heading: "Usability testing & user research",
        blocks: [
          { t: "h3", text: "Adding Developers to the navigation" },
          {
            t: "media",
            caption: "Developers added to Snowflake.com’s global navigation",
            src: ["/work/developers-hub/navigation-developers-menu.jpg"],
            alts: [
              "Snowflake.com with the new Developers menu open in the global navigation, showing three columns: Build (Developers overview, Solutions center, Downloads), Learn (Documentation, Quickstarts, Open source, Hands-on labs, Builder education) and Connect (Engineering blog, Community), plus featured resources on the right",
            ],
          },
          { t: "p", text: "User testing was performed with developers to determine their sentiment about adding “Developers” to the global header navigation. Testing probed on:" },
          { t: "list", items: [
            "What do developers expect to find in the navigation drop-down?",
            "Are the labels intuitive?",
            "Is anything missing from the menu?",
            "What does this say to you about Snowflake as a company?",
          ] },
          { t: "p", text: "This research validated our assumption that the menu update is viewed positively by this audience — and signals to all users that Snowflake is developer-focused." },
        ],
      },
      {
        id: "prototype",
        nav: "Final prototype",
        heading: "Final design prototype",
        blocks: [{ t: "figma", src: FIGMA_DEV_HUB, caption: "Final design prototype" }],
      },
      {
        id: "results",
        nav: "Results",
        heading: "Results",
        blocks: [
          { t: "stats", items: [
            { value: "94%", label: "Increase in page views per month" },
            { value: "11.3%", label: "Decrease in bounce rate" },
            { value: "5", label: "New templates designed for scale" },
          ] },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ IV
  {
    slug: "self-service-renewal",
    plate: "Pl. IV",
    company: "Docusign",
    kicker: "Docusign · Self-service renewal",
    title: "Creating a self-service subscription renewal experience in the Docusign app",
    dek: "How I created a new experience for scale to enable users and reduce support reliance.",
    meta: [
      { label: "Role", value: "Lead product designer" },
      { label: "Team", value: "PM (sponsor), support product designer, content designer, program manager, engineering, analytics" },
      { label: "Outcome", value: "$137.5k+ estimated MRR, fiscal year 2025" },
    ],
    hero: "/work/self-service-renewal/hero.webp",
    heroCaption: "Docusign “Manage your subscription” renewal modal, shown on a laptop and a phone",
    sections: [
      {
        id: "problem",
        nav: "Problem & goals",
        heading: "Problem & goals",
        blocks: [
          { t: "statement", text: "Turning a manual customer support process into a seamless self-service experience" },
          { t: "p", text: "Docusign’s flagship product — eSignature — has been transitioning once-manual processes into self-service. This gradual shift has led to increased profits and an improved user experience. Application admins could purchase licenses to add team members, but before this product update, they had to contact support in order to reduce the number of licenses on their account." },
          { t: "h3", text: "Problem" },
          { t: "p", text: "The current eSignature admin experience doesn’t provide a self-service option for account administrators to decrease the number of licenses on their plan." },
          { t: "h3", text: "Hypothesis" },
          { t: "p", text: "By launching a renewal experience that allows flexibility to reduce licenses, we can reduce the strain on support center resources that currently manage this manual process." },
          { t: "h3", text: "Design goals" },
          { t: "p", text: "In addition to the project sponsor goals, I had my own design goals to improve the overall user experience:" },
          { t: "list", items: [
            "Create a one-stop shop for all plan information and changes, including self-service license reductions",
            "Allow cancelation of a pending plan change",
            "Design email and in-product renewal notifications reflecting changes",
            "Create more user-friendly language in the license removal process",
          ] },
          { t: "h3", text: "Key performance indicators" },
          { t: "list", items: ["Reduce support contacts for license removals", "Track traffic to the new renewal experience; create a baseline for future measurement", "Track reasons for license churn"] },
          { t: "h3", text: "My role" },
          { t: "p", text: "I was lead product designer overseeing the project from discovery, to concepts, to usability testing, to final design delivery. The team included a product manager (sponsor), a support product designer, a content designer, a program manager, front-end and back-end engineering teams, and analytics managers." },
        ],
      },
      {
        id: "discovery",
        nav: "Discovery",
        heading: "Discovery",
        blocks: [
          { t: "h3", text: "Current experience audit" },
          { t: "p", text: "The ability to un-assign a user from a license existed within the self-service options. That experience was reviewed to identify opportunities for improvement and note what was missing." },
          { t: "video", vimeoId: "925235846", caption: "Current “Users” settings seat-change walkthrough", ratio: 1.675 },
          { t: "note", text: "The current experience manages seat changes within the “Users” setting — not where the other account changes take place." },
          { t: "h3", text: "Opportunities identified while auditing" },
          { t: "numbered", items: [
            { n: "I.", title: "Meet user expectations", text: "If this admin is accustomed to making plan changes in a specific place, the new experience should be housed there." },
            { n: "II.", title: "Words matter — a lot", text: "Helping the admin find the renewal experience relies heavily on the words we use to identify it. Our extended team put a lot of effort into determining which words would best help the admin find this new space." },
            { n: "III.", title: "Lose the system terminology", text: "Get rid of internal system terminology wherever possible. It’s not natural to “close” a user. If you don’t say it in real life, it shouldn’t be part of a digital transaction." },
          ] },
          { t: "h3", text: "Competitive analysis" },
          { t: "statement", text: "Why use a car insurance plan as inspiration?" },
          { t: "p", text: "Without a paid subscription, I hit a paywall when trying to walk through the true paid-plan renewal experience of similar SaaS products. A team member’s car insurance renewal flow helped me envision the type of experience I aimed to design." },
          {
            t: "media",
            caption: "Car insurance renewal flow",
            carousel: true,
            src: [1, 2, 3, 4, 5, 6].map((n) => `/work/self-service-renewal/car-insurance-${n}.webp`),
            alts: [
              "Policy summary with charges, named insured and Edit policy button",
              "Make policy changes: add or remove vehicles, add or remove drivers, edit coverages",
              "Coverages overview with policy, driver and vehicle accordions",
              "Bodily injury liability coverage options with running premium",
              "Coverages list with Manage vehicles, Manage drivers and Continue buttons",
              "Review of policy changes and premium changes with Update policy button",
            ],
          },
        ],
      },
      {
        id: "ideation",
        nav: "Ideation",
        heading: "Ideation",
        blocks: [
          { t: "statement", text: "Mapping every scenario" },
          { t: "p", text: "Many user flows were created to solve the problem at hand, while also accounting for features launching shortly after this rollout. This version isn’t the final user journey — it’s shown to demonstrate the complex scenarios I had to account for. All flows are available to view in [FigJam](https://www.figma.com/board/oiQVDbI7tvVegFQFOQPHLX/PLG-20084_-Decoupling-User-Deactivation-and-Seat-License-Removal-Revamp-for-Web-Customers-User-Flow?node-id=0-1&p=f&t=9ezJurtdgpb1N2Fl-0)." },
          {
            t: "media",
            caption: "Upgrade flow exploration",
            src: ["/work/self-service-renewal/user-flow-1.webp"],
            alts: ["User flow for changing a plan during the renewal period, from eSign settings through to checkout and provisioning the plan update"],
          },
          {
            t: "media",
            caption: "Flow model expanded: hub and spoke exploration",
            src: ["/work/self-service-renewal/user-flow-2.webp"],
            alts: ["Hub and spoke renewal flow model exploration with content requirements, use cases, pros and cons"],
          },
          { t: "callout", label: "An unwelcome surprise", title: "The functionality I wanted wasn’t possible 💣", text: "The issue was revealed through this exploration." },
          { t: "p", text: "This design goal was my main priority for an optimal user experience:" },
          { t: "note", text: "Create a one-stop shop for all plan information and changes, including self-service license reductions." },
          { t: "p", text: "After sharing extensive user flow ideations with Product Management and Engineering, it became clear it wouldn’t be possible in phase one. The compromise was to create the easiest way for a user to cancel a pending change, then introduce the desired functionality in phase two." },
          { t: "h3", text: "Early concept wireframes" },
          { t: "statement", text: "Explored full-page and modal renewal hubs" },
          { t: "p", text: "Once we determined the need for a dedicated space for the renewal experience, I explored full-page vs. modal design options. I pushed for a full-page experience because it would scale better for future functionality." },
          { t: "p", text: "The project timeline was limited by the large engineering scope, so I had to compromise on a modal experience." },
          {
            t: "media",
            caption: "Modal renewal hub: plan options, seats and envelopes, and confirmation",
            carousel: true,
            src: [1, 2, 3].map((n) => `/work/self-service-renewal/hub-modal-${n}.webp`),
            alts: [
              "Manage your renewal plan modal showing account, plan, seats and the auto renewal payment",
              "Change your plan modal, step one of three, comparing Personal, Standard and Business Pro",
              "Manage seats and envelopes modal, step two of three, with an order summary",
            ],
          },
          {
            t: "media",
            caption: "Full-page renewal hub: current plan and a pending plan change",
            carousel: true,
            src: [1, 2].map((n) => `/work/self-service-renewal/hub-fullpage-${n}.webp`),
            alts: [
              "Full-page Manage Renewal Subscription showing Business Pro, annual billing and the renewal payment",
              "Full-page Manage Renewal Subscription with the plan changed to Standard and a Changed badge",
            ],
          },
        ],
      },
      {
        id: "testing",
        nav: "Usability testing",
        heading: "Usability testing",
        blocks: [
          { t: "video", vimeoId: "912434298", caption: "Usability testing prototype", ratio: 1.202 },
          { t: "h3", text: "Research findings & opportunities" },
          { t: "p", text: "User research confirmed two necessary updates:" },
          { t: "leadp", lead: "Improve “manage subscription” findability.", text: "While I pushed to update the “change plan” button to include the manage subscription experience at launch, the research proved that update was needed as soon as possible. Ultimately, it shipped as a fast follow in the phase immediately after launch." },
          { t: "leadp", lead: "Revise the awkward “undo pending change” experience.", text: "While this was a compromise, it needed to be more elegant. I moved the interruptive yellow banner and button to replace the disabled button, bringing the intended action where the user expected it. Thankfully, this band-aid was removed once the back end was updated in phase two — and users could make changes as I originally intended." },
        ],
      },
      {
        id: "final",
        nav: "Final designs",
        heading: "Final designs",
        blocks: [
          { t: "p", text: "Final designs were delivered to engineering with accessibility annotations, responsive screen sizes and variants for edge cases." },
          { t: "h3", text: "Reducing seats" },
          {
            t: "media",
            caption: "Final designs: reducing seats from Plan and Billing to the confirmation email",
            carousel: true,
            src: [
              "flow-01-plan-and-billing", "flow-02-manage-subscription", "flow-03-edit-seats", "flow-04-edit-seats-compare",
              "flow-05-reason", "flow-06-reason-other", "flow-07-confirm", "flow-08-confirmed",
              "flow-09-change-pending", "flow-10-seats-and-users", "flow-email",
            ].map((n) => `/work/self-service-renewal/final-${n}.webp`),
            alts: [
              "Plan and Billing page where the flow begins, with Manage Your Subscription highlighted",
              "Manage your subscription modal with Switch Plan and Edit Quantity",
              "Edit seats and envelopes modal showing 2 seats",
              "Edit seats and envelopes modal comparing 2 seats with 1 seat starting Dec. 18, 2023",
              "What led to this change survey with reasons to choose from",
              "Survey with Other selected and an optional comments field",
              "Confirm your subscription comparing current and updated renewal cost",
              "Your change is confirmed",
              "Plan and Billing with a pending change banner and a Subscription change submitted notice",
              "Seats and Users page prompting the admin to remove users before renewal",
              "Gmail inbox showing the email “Your subscription has been updated”, where the flow ends",
            ],
          },
          { t: "h3", text: "Undoing a pending change" },
          {
            t: "media",
            caption: "Final designs: undoing a pending change and making a new one",
            carousel: true,
            src: ["undo-1-manage-pending", "undo-2-undone", "undo-3-edit-seats", "undo-4-confirm", "undo-5-confirmed"].map(
              (n) => `/work/self-service-renewal/final-${n}.webp`,
            ),
            alts: [
              "Manage your subscription modal showing a pending change from Business Pro to Standard, with an Undo Pending Change button",
              "Manage your subscription modal confirming the pending change was undone",
              "Edit seats and envelopes modal comparing 3 seats with 1 seat",
              "Confirm your subscription comparing 3 seats with 1 seat",
              "Your change is confirmed for 3 seats to 1 seat",
            ],
          },
        ],
      },
      {
        id: "results",
        nav: "Results & learnings",
        heading: "Results & learnings",
        blocks: [
          { t: "h3", text: "Results" },
          { t: "stats", items: [
            { value: "12", label: "Design iterations" },
            { value: "$50k+", label: "Estimated monthly recurring revenue for fiscal year 2024" },
            { value: "$137.5k+", label: "Estimated monthly recurring revenue for fiscal year 2025" },
          ] },
          { t: "h3", text: "What I learned" },
          { t: "p", text: "The design goals I had for this project weren’t realistic once I discovered back-end system constraints would limit functionality." },
          { t: "p", text: "I had to trade off the goal of letting the user make multiple changes at once for allowing just one change per renewal period. This was a disappointment, but it further emphasized the need to fix the issue — which was addressed in the next phase. To solve for this lack of system flexibility, I created clear messaging and UI treatment so the admin understands the actions they’re able to take, and how to undo them." },
          { t: "p", text: "Next time, I’ll ask more questions of the project sponsor at kickoff — in particular, whether the full range of stakeholders and teams are aware of the scope. If the back-end engineering team had been included earlier, I could have designed the flow knowing how system limitations impacted the user experience." },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ V
  {
    slug: "contact-sales",
    plate: "Pl. V",
    company: "Docusign",
    kicker: "Docusign · Content & lead generation",
    title: "Content & UI refresh on Docusign’s contact sales form",
    dek: "How small content changes make a big impact on a primary lead generation form.",
    meta: [
      { label: "Role", value: "Lead product designer" },
      { label: "Team", value: "PM (sponsor), content designer, user researcher, program & project managers, engineering, analytics" },
      { label: "Outcome", value: "+300% click-through rate on the support link" },
    ],
    hero: "/work/docusign-contact-sales/hero.webp",
    heroCaption: "Redesigned contact sales form, laptop and phones",
    sections: [
      {
        id: "problem",
        nav: "Problem & goals",
        heading: "Problem & goals",
        blocks: [
          { t: "statement", text: "An outdated form that left users at a dead end" },
          { t: "p", text: "The form to contact Docusign’s sales team was outdated, stale and not communicating all it could to create a better overall user experience." },
          { t: "p", text: "Additionally, the form left users at a dead end where there was a clear opportunity to promote a free trial." },
          { t: "h3", text: "Hypotheses / design goals" },
          { t: "p", text: "Rethink the overall experience of contacting sales, placing emphasis on:" },
          { t: "list", items: [
            { lead: "Content strategy:", text: "providing helpful context and setting expectations on sales response times." },
            { lead: "Omit unnecessary form fields:", text: "reducing friction without sacrificing lead scoring." },
            { lead: "Direct to support:", text: "accurately guiding customers seeking support." },
            { lead: "Engagement:", text: "creating opportunities for customers to engage with Docusign products after successfully entering the sales funnel." },
          ] },
          { t: "h3", text: "Key performance indicators" },
          { t: "list", items: ["Increase contact sales form submissions", "Decrease customer support submissions", "Increase free trial sign-up rate"] },
          { t: "h3", text: "My role" },
          { t: "p", text: "I was lead product designer, working with a product manager (sponsor), content designer, user researcher, program manager, project manager, engineering team and analytics manager. My role was to design the visual look and feel, create test prototypes, conduct usability testing on the final outcome and perform quality assurance testing prior to launch." },
        ],
      },
      {
        id: "discovery",
        nav: "Discovery",
        heading: "Discovery",
        blocks: [
          { t: "h3", text: "Current experience audit" },
          { t: "video", vimeoId: "912450993", caption: "Current contact sales form walkthrough", ratio: 1.761 },
          { t: "h3", text: "Opportunities identified through customer research & discovery" },
          { t: "numbered", items: [
            { n: "i.", title: "Set expectations about turnaround time", text: "Customer experience is negatively impacted without guidance on when they’ll be contacted — both before and after form submission." },
            { n: "ii.", title: "Provide contact option flexibility", text: "Provide clear options for contacting sales outside of completing the form." },
            { n: "iii.", title: "Reroute to support where appropriate", text: "Minimize incorrect routing of requests to sales and accurately guide customers seeking support. The support link sat below the fold on a typical laptop, and many users missed it." },
            { n: "iv.", title: "Don’t dead end", text: "Create opportunities for engagement with Docusign products after successfully entering the sales funnel — e.g. one-click trial initiation." },
          ] },
          { t: "h3", text: "Competitive analysis" },
          {
            t: "media",
            caption: "Competitor contact forms and confirmation pages",
            carousel: true,
            src: ["stripe", "salesforce", "square", "asana", "hellosign", "atlassian"].map(
              (n) => `/work/docusign-contact-sales/competitor-${n}.webp`,
            ),
            alts: [
              "Stripe contact sales form and its Thank you confirmation page",
              "Salesforce contact page with a request-a-call form and its confirmation message",
              "Square flow that filters customer needs before showing the sales form, ending on a phone number page",
              "Asana Talk with our sales team form and its Thanks for reaching out page",
              "HelloSign flow from the homepage to the contact form, annotated with poor accessibility and unclear required fields, ending on a thank you page",
              "Atlassian What would you like to discuss with our sales team form and its Message received page",
            ],
          },
          { t: "h3", text: "Discovery workshop" },
          { t: "p", text: "Objective" },
          { t: "p", text: "A discovery workshop is conducted in the early phases of a new project and encourages cross-collaboration among stakeholders and teams to define the value proposition, establish the target audience and surface user problem areas and opportunities. The objective is gaining consensus on overall project goals and direction: what the problem is, who our audience is and where our areas of focus should be." },
          { t: "p", text: "The workshop was designed and led by our senior user researcher. I partnered with her to create assets and goals." },
          {
            t: "media",
            caption: "A snapshot of a workshop Miro board",
            zoom: true,
            src: ["/work/docusign-contact-sales/workshop-miro-board.webp"],
            alts: ["Miro board of workshop ideas on sticky notes, plotted from low to high effort and grouped into clusters such as confirmation page ideas, multiple CTA options and sales-dependent scheduling"],
          },
          { t: "h3", text: "Pre-workshop in-depth interviews" },
          {
            t: "media",
            caption: "Pre-workshop in-depth interviews",
            narrow: true,
            src: ["/work/docusign-contact-sales/pre-workshop-interviews.webp"],
            alts: ["Two colleagues in conversation at a table in front of a whiteboard covered in notes and sketches"],
          },
          { t: "p", text: "Objectives" },
          { t: "list", items: [
            "Foundational and iterative design research to gain general understanding and feedback on the current and proposed design for contacting sales",
            "Capture core performers to understand the target audience and customer journey for contacting sales",
            "Benchmark the usability of both current and proposed flows to measure against future enhancements",
          ] },
          { t: "p", text: "Research goals — to understand…" },
          { t: "list", items: [
            "Our users’ mental models for why, when and how they contact sales",
            "Customers’ expectations when contacting sales",
            "Points of friction in current and proposed solutions",
            "Whether messaging is effective and helpful",
            "What information customers are willing to provide for sales lead scoring",
            "Why and when customers lose engagement, and how to potentially re-engage",
          ] },
          { t: "h3", text: "Workshop & interviews outcome" },
          { t: "p", text: "We defined the target personas, a problem statement, a journey map, idea generation and prioritization of desired outcomes." },
        ],
      },
      {
        id: "ideation",
        nav: "Ideation",
        heading: "Ideation",
        blocks: [
          { t: "h3", text: "Journey map" },
          { t: "statement", text: "Initial design concepts had a filtered approach" },
          { t: "p", text: "I mapped out the journey based on what the user was looking to accomplish." },
          {
            t: "media",
            caption: "Journey map",
            zoom: true,
            src: ["/work/docusign-contact-sales/journey-map.webp"],
            alts: ["Basic form system overview from March 2022: the contact sales landing page branches into Products & Features, Cost Estimate and Support, each with its own form and thank you page"],
          },
          { t: "h3", text: "Early concept wireframes" },
          { t: "statement", text: "Narrowing down the direction" },
          { t: "p", text: "In partnership with the product manager stakeholder, we settled on a design closer to the current experience — not requiring additional steps or filtering by desired action." },
          { t: "p", text: "The concept ideation wasn’t forgotten; it was added as a future testing opportunity." },
          {
            t: "media",
            caption: "Early concept wireframes",
            carousel: true,
            // Order: the single-form concepts first, then the filtered flow in dot order, then the thank you page
            src: [7, 1, 5, 4, 3, 2, 6].map((n) => `/work/docusign-contact-sales/wireframe-${n}.webp`),
            alts: [
              "Single form concept with a Get help right away sidebar listing ways to talk, chat or get support",
              "Single form concept with a Hello, there! message from a Sales Member and other contact options below",
              "Filtered concept, step one: Hello! What can I help you with today? with Product & Features and Cost Estimates options",
              "Filtered concept, step two: We'd like to get to know you first, with name, email and phone fields",
              "Filtered concept, step three: Which products are you interested in? with six product choices",
              "Filtered concept, step four: What's the size of your team? with a seat counter",
              "Thank you page with a 24 hour promise and an eSignature free trial offer",
            ],
          },
        ],
      },
      {
        id: "testing",
        nav: "Usability testing",
        heading: "Usability testing",
        blocks: [
          { t: "video", vimeoId: "830662950", caption: "High-fidelity test prototype", ratio: 1.605 },
          { t: "p", text: "I conducted usability testing with the high-fidelity designs to confirm we were meeting our design goals. Testing confirmed our direction, and we moved forward to engineering and production of the final experience." },
        ],
      },
      {
        id: "final",
        nav: "Final & experiment designs",
        heading: "Final & experiment designs",
        blocks: [
          { t: "h3", text: "Final designs" },
          {
            t: "media",
            caption: "Final designs",
            carousel: true,
            scroll: true,
            src: [1, 2, 3, 4, 5].map((n) => `/work/docusign-contact-sales/final-${n}.webp`),
            alts: [
              "Connect with our sales team form with the support and phone options beside it",
              "You're all set confirmation with an offer to start a 30-day eSignature free trial",
              "Check your inbox page telling the visitor an activation email was sent",
              "Email confirmation with a Welcome message and a Confirm My Email button",
              "Set your password step of the free trial sign-up",
            ],
          },
          { t: "h3", text: "Experiment designs" },
          { t: "statement", text: "A/B tests ready to go" },
          { t: "p", text: "The unshipped concepts explored during ideation were built out into designs that are ready to launch as A/B tests." },
          {
            t: "media",
            caption: "Experiment designs",
            carousel: true,
            zoom: true,
            src: [1, 2, 3, 4].map((n) => `/work/docusign-contact-sales/experiment-${n}.webp`),
            alts: [
              "Experiment: 1-click trial flow initiation, from the You're all set page through the email to a welcome message",
              "Experiment: generating more robust lead data with an optional second step, Let's customize your experience",
              "Experiment: driving click through rate by reducing friction with a selector of top reasons for contacting us",
              "Experiment: driving specific products with thank you pages that recommend plans, content or a free trial",
            ],
          },
        ],
      },
      {
        id: "results",
        nav: "Results & learnings",
        heading: "Results & learnings",
        blocks: [
          { t: "h3", text: "Results" },
          { t: "stats", items: [
            { value: "+5%", label: "Lift in trial sign-ups" },
            { value: "+300%", label: "Click-through rate on support link" },
            { value: "53%", label: "Of customers engaged with new content" },
          ] },
          { t: "h3", text: "Summary of redesign results" },
          { t: "p", text: "The experience improved the way customers navigate to the help they need — support or sales." },
          { t: "list", items: [
            "The updated experience successfully drew support requests away from the direct sales pipeline",
            "Higher-quality sales leads made their way into the downstream sales funnel",
            "No statistically significant metrics showed lower inquiry volume resulting in reduced sales",
          ] },
          { t: "h3", text: "What I learned" },
          { t: "p", text: "The process was rewarding: go wide, then narrow the vision based on a “do no harm” philosophy." },
          { t: "p", text: "The early design explorations were a departure from both the current experience and the final approved designs. They helped us think outside the box and created future experimentation concepts. While I was frustrated at times that I couldn’t make more sweeping changes, the process was rewarding." },
        ],
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
