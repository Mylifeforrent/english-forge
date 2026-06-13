import { categories, type Category, type Question } from "./types";

export { categories };

const categoryCounts = {
  software: 15,
  web: 15,
  java: 15,
  react: 15,
  ai: 15,
  daily: 15,
  ielts: 30
} as const;

const prompts: Question[] = [
  ["software", "我们需要在生产环境中加入更好的可观测性。", "We need to add better observability in production.", ["We need better production observability."], ["observability covers logs, metrics, and traces"], ["observability", "production"]],
  ["software", "这个改动会降低部署失败时的排查成本。", "This change will reduce the cost of debugging failed deployments.", ["This will make failed deployments easier to investigate."], ["reduce the cost of doing something"], ["deployment", "debugging"]],
  ["software", "先不要重构整个模块，先修复用户能感知到的问题。", "Let's not refactor the entire module yet; let's fix the user-visible issue first.", ["We should fix the user-facing problem before refactoring the whole module."], ["user-visible and user-facing are both natural"], ["refactor", "user-facing"]],
  ["software", "这个接口应该保持向后兼容。", "This interface should remain backward compatible.", ["We should keep this interface backward compatible."], ["backward compatible is common in API design"], ["interface", "compatibility"]],
  ["software", "我们需要把这个边界条件写进测试里。", "We need to cover this edge case in the tests.", ["This edge case should be included in our test coverage."], ["cover an edge case"], ["edge case", "tests"]],
  ["software", "日志太吵了，真正重要的错误反而被淹没了。", "The logs are too noisy, so the important errors are getting buried.", ["There is too much log noise, and real errors are hard to spot."], ["noisy logs is idiomatic"], ["logging", "errors"]],
  ["software", "这个设计把业务逻辑和数据访问耦合得太紧了。", "This design couples the business logic too tightly with data access.", ["The business logic is too tightly coupled to the data layer."], ["tightly coupled to/with"], ["coupling", "data access"]],
  ["software", "我们应该先定义清楚模块之间的责任边界。", "We should define clear responsibility boundaries between the modules first.", ["Let's clarify what each module is responsible for first."], ["responsibility boundaries sounds architectural"], ["modules", "boundaries"]],
  ["software", "这个问题不是性能问题，而是缓存失效策略的问题。", "This is not a performance issue; it is an issue with the cache invalidation strategy.", ["The bottleneck is the cache invalidation strategy, not raw performance."], ["cache invalidation is a fixed phrase"], ["cache", "performance"]],
  ["software", "如果这个任务失败了，我们需要有可恢复的状态。", "If this job fails, we need a recoverable state.", ["The system needs to be able to recover if this job fails."], ["recoverable state is concise"], ["recovery", "state"]],
  ["software", "这个错误信息应该告诉开发者下一步该做什么。", "This error message should tell developers what to do next.", ["The error should include an actionable next step."], ["actionable is useful for docs and errors"], ["errors", "developer experience"]],
  ["software", "我们不要为还没有出现的规模问题过度设计。", "We should not over-engineer for scale problems we do not have yet.", ["Let's avoid designing for scale before we actually need it."], ["over-engineer is common"], ["scale", "architecture"]],
  ["software", "这个功能需要一个清晰的回滚方案。", "This feature needs a clear rollback plan.", ["We need a clear plan to roll this feature back."], ["rollback plan is deployment language"], ["rollback", "release"]],
  ["software", "先把核心路径稳定下来，再优化边缘场景。", "Let's stabilize the core path first, then optimize the edge cases.", ["We should make the main flow reliable before tuning edge cases."], ["core path means main flow"], ["core flow", "stability"]],
  ["software", "这个需求听起来简单，但会影响很多调用方。", "This requirement sounds simple, but it will affect many callers.", ["It looks simple, but a lot of consumers depend on this behavior."], ["caller/consumer depends on context"], ["callers", "impact"]],

  ["web", "这个页面首屏应该直接进入练习，而不是展示营销内容。", "The first screen should take users straight into practice, not show marketing content.", ["Users should land directly in the practice experience."], ["first screen is natural UI language"], ["first screen", "practice"]],
  ["web", "移动端按钮不能因为文字变长而换行得很难看。", "On mobile, buttons should not wrap awkwardly just because the text is longer.", ["Button labels need to remain clean on mobile."], ["wrap awkwardly describes layout bugs"], ["mobile", "buttons"]],
  ["web", "这个表单提交失败时要保留用户已经输入的内容。", "If the form submission fails, we should keep what the user has already typed.", ["The form should preserve the user's input after a failed submission."], ["preserve input is common"], ["form", "failure"]],
  ["web", "历史记录应该能刷新页面后继续看到。", "The history should still be visible after refreshing the page.", ["Practice history needs to survive a page refresh."], ["survive a refresh is natural engineering phrasing"], ["history", "refresh"]],
  ["web", "这个组件的空状态不要写太多说明文字。", "The empty state should not include too much explanatory text.", ["Keep the empty state short and quiet."], ["empty state is a UI term"], ["empty state", "copy"]],
  ["web", "筛选条件改变后，当前题目应该重新从匹配的题库里选择。", "When the filter changes, the current prompt should be selected again from the matching question set.", ["Changing filters should pick a prompt from the filtered set."], ["matching question set"], ["filters", "state"]],
  ["web", "这个接口返回的数据结构要方便前端直接渲染。", "The API response shape should be easy for the frontend to render directly.", ["The API should return data in a frontend-friendly shape."], ["response shape is common"], ["API", "rendering"]],
  ["web", "不要让加载状态把整个页面布局撑变形。", "The loading state should not cause the whole page layout to shift.", ["Loading should not create layout shift."], ["layout shift is a web performance term"], ["loading", "layout shift"]],
  ["web", "保存成功后给一个轻量反馈就够了。", "After a successful save, a lightweight confirmation is enough.", ["A subtle saved message is enough after saving."], ["lightweight confirmation"], ["feedback", "save"]],
  ["web", "这个页面要适合每天反复使用，而不是只看起来漂亮。", "This page should be suitable for repeated daily use, not just look pretty.", ["It needs to support daily practice, not just visual polish."], ["repeated daily use"], ["usability", "daily use"]],
  ["web", "右侧历史记录不能抢走主练习区的注意力。", "The history panel on the right should not steal attention from the main practice area.", ["The history sidebar should stay secondary to the practice flow."], ["steal attention is natural"], ["sidebar", "focus"]],
  ["web", "我们应该把错误提示写得具体一点。", "We should make the error message more specific.", ["The error copy should be more precise."], ["specific/precise error copy"], ["error message", "copy"]],
  ["web", "这个请求不需要每次输入一个字就发送。", "This request does not need to be sent on every keystroke.", ["We do not need to fire this request for every character the user types."], ["on every keystroke"], ["request", "input"]],
  ["web", "题目切换时，答案区域应该自动收起。", "When the prompt changes, the answer section should collapse automatically.", ["The answer panel should hide again after moving to a new prompt."], ["collapse/hide panel"], ["answer panel", "state"]],
  ["web", "页面的主要操作应该放在输入框附近。", "The main actions should be placed near the input box.", ["Primary actions should stay close to the answer field."], ["primary actions"], ["actions", "layout"]],

  ["java", "这个类不应该同时负责校验、保存和发送通知。", "This class should not be responsible for validation, persistence, and sending notifications all at once.", ["This class is doing too many things at the same time."], ["responsible for"], ["class", "responsibility"]],
  ["java", "接口描述的是能力，而不是具体实现。", "An interface describes a capability, not a concrete implementation.", ["Interfaces define what something can do, not how it does it."], ["what vs how is useful"], ["interface", "implementation"]],
  ["java", "这个异常应该在服务层被转换成业务错误。", "This exception should be translated into a business error in the service layer.", ["The service layer should convert this exception into a domain-level error."], ["domain-level error"], ["exception", "service layer"]],
  ["java", "不要把数据库实体直接暴露给前端。", "Do not expose database entities directly to the frontend.", ["We should not send persistence entities straight to the client."], ["persistence entity"], ["entity", "frontend"]],
  ["java", "这个方法名应该表达业务意图，而不是实现细节。", "The method name should express the business intent, not the implementation detail.", ["Name the method after what it means in the domain."], ["business intent"], ["method", "naming"]],
  ["java", "事务边界应该放在用例层，而不是工具类里。", "The transaction boundary should live in the use-case layer, not inside a utility class.", ["Transactions should be managed around the use case."], ["transaction boundary"], ["transaction", "use case"]],
  ["java", "这个枚举值以后可能会扩展，所以不要写死判断。", "These enum values may expand later, so we should avoid hard-coded checks.", ["Do not hard-code the logic against today's enum values."], ["hard-coded checks"], ["enum", "hard-coded"]],
  ["java", "构造函数里不要做网络请求。", "Do not make network requests inside the constructor.", ["A constructor should not perform network I/O."], ["network I/O"], ["constructor", "network"]],
  ["java", "这个对象创建之后应该保持不可变。", "This object should remain immutable after it is created.", ["The object should be immutable once constructed."], ["immutable once constructed"], ["immutability", "object"]],
  ["java", "我们可以用依赖注入来降低耦合。", "We can use dependency injection to reduce coupling.", ["Dependency injection can make the components less tightly coupled."], ["dependency injection"], ["DI", "coupling"]],
  ["java", "这个单元测试不应该依赖真实数据库。", "This unit test should not depend on a real database.", ["A unit test should not require a real database connection."], ["unit vs integration test"], ["unit test", "database"]],
  ["java", "服务返回空列表比返回 null 更安全。", "Returning an empty list from the service is safer than returning null.", ["An empty list is safer than null here."], ["empty list over null"], ["null", "list"]],
  ["java", "这个字段必须在进入领域对象之前完成校验。", "This field must be validated before it enters the domain object.", ["Validate this field before creating the domain object."], ["domain object"], ["validation", "domain"]],
  ["java", "我们需要避免在循环里重复查询数据库。", "We need to avoid querying the database repeatedly inside the loop.", ["Avoid running a database query on every iteration."], ["on every iteration"], ["database", "loop"]],
  ["java", "这个接口的返回值应该表达失败原因。", "The return value of this interface should express the reason for failure.", ["The interface should return enough information to explain why it failed."], ["reason for failure"], ["interface", "failure"]],

  ["react", "这个状态应该提升到父组件里。", "This state should be lifted up to the parent component.", ["We should lift this state to the parent."], ["lift state up is React language"], ["state", "parent"]],
  ["react", "不要把派生状态重复存一份。", "Do not store duplicated derived state.", ["We should avoid keeping derived state as separate state."], ["derived state"], ["derived state", "duplication"]],
  ["react", "这个 effect 只应该在筛选条件变化时运行。", "This effect should only run when the filter changes.", ["The effect should depend on the filter, not every render."], ["effect dependencies"], ["effect", "filter"]],
  ["react", "列表项需要稳定的 key，不能用随机数。", "List items need stable keys; we should not use random numbers.", ["Use stable keys for list items instead of random values."], ["stable key"], ["key", "list"]],
  ["react", "这个组件应该接收数据，而不是自己请求数据。", "This component should receive data instead of fetching it by itself.", ["Data fetching should happen outside this component."], ["receive data via props"], ["component", "data"]],
  ["react", "输入框的值应该由状态控制。", "The input value should be controlled by state.", ["This should be a controlled input."], ["controlled input"], ["input", "state"]],
  ["react", "保存成功后不要重新加载整个页面。", "Do not reload the whole page after a successful save.", ["After saving, update the UI without a full page reload."], ["full page reload"], ["save", "UI update"]],
  ["react", "这个回调需要记住当前题目的 ID。", "This callback needs to keep track of the current question ID.", ["The callback needs access to the current prompt ID."], ["keep track of"], ["callback", "ID"]],
  ["react", "我们应该把复杂的状态转换抽成一个小函数。", "We should extract the complex state transition into a small function.", ["Move this state update logic into a helper."], ["state transition"], ["state", "helper"]],
  ["react", "不要为了微小的性能收益过早使用 memo。", "Do not use memo too early for tiny performance gains.", ["Avoid premature memoization for such a small gain."], ["premature memoization"], ["memo", "performance"]],
  ["react", "这个组件重新渲染是正常的，不一定是 bug。", "This component re-rendering is normal and not necessarily a bug.", ["A re-render here does not automatically mean something is wrong."], ["not necessarily"], ["render", "bug"]],
  ["react", "加载中和保存中的状态应该分开。", "The loading and saving states should be separate.", ["Loading and saving should be tracked independently."], ["tracked independently"], ["loading", "saving"]],
  ["react", "错误边界只能捕获渲染阶段的错误。", "Error boundaries only catch errors during rendering.", ["An error boundary does not catch every kind of error."], ["error boundary"], ["error boundary", "rendering"]],
  ["react", "这个 hook 应该返回行为，而不是 UI。", "This hook should return behavior, not UI.", ["The hook should expose state and actions, not rendered elements."], ["hooks return state/actions"], ["hook", "UI"]],
  ["react", "按钮禁用时也要给用户明确原因。", "When a button is disabled, users should still understand why.", ["A disabled button should make the reason clear."], ["disabled state reason"], ["button", "UX"]],

  ["ai", "我们需要给模型加一道护栏，防止它输出敏感信息。", "We need to add a guardrail to prevent the model from outputting sensitive information.", ["The model needs a guardrail against leaking sensitive information."], ["guardrail is common in AI safety"], ["guardrail", "sensitive data"]],
  ["ai", "这个提示词应该约束输出格式。", "This prompt should constrain the output format.", ["The prompt needs to specify the expected output format."], ["constrain output format"], ["prompt", "format"]],
  ["ai", "不要把用户的私密数据放进日志里。", "Do not put the user's private data into logs.", ["We should never log private user data."], ["private data in logs"], ["privacy", "logging"]],
  ["ai", "如果模型不确定，它应该承认不确定，而不是编造答案。", "If the model is unsure, it should admit uncertainty instead of making up an answer.", ["The model should say when it is uncertain rather than hallucinate."], ["hallucinate means fabricate"], ["uncertainty", "hallucination"]],
  ["ai", "检索结果应该带上来源，方便用户验证。", "Retrieved results should include sources so users can verify them.", ["Search results need citations for verification."], ["citation/source"], ["retrieval", "citation"]],
  ["ai", "这个评测集要覆盖常见失败场景。", "This evaluation set should cover common failure cases.", ["The eval set needs to include typical failure modes."], ["failure mode"], ["evaluation", "failure"]],
  ["ai", "我们不能只看回答是否流畅，还要看事实是否正确。", "We cannot only judge whether the answer is fluent; we also need to check factual accuracy.", ["Fluency is not enough; factual accuracy matters too."], ["factual accuracy"], ["fluency", "accuracy"]],
  ["ai", "这个 agent 应该在执行操作前先请求确认。", "This agent should ask for confirmation before taking action.", ["The agent needs user confirmation before it acts."], ["ask for confirmation"], ["agent", "confirmation"]],
  ["ai", "系统提示词应该定义边界，而不是塞满例子。", "The system prompt should define boundaries instead of being packed with examples.", ["Use the system prompt to set constraints, not to dump examples."], ["define boundaries"], ["system prompt", "constraints"]],
  ["ai", "我们需要记录模型为什么拒绝这个请求。", "We need to record why the model rejected this request.", ["The rejection reason should be logged."], ["rejection reason"], ["rejection", "logging"]],
  ["ai", "这个工具调用失败后，模型应该给出可恢复的下一步。", "If this tool call fails, the model should provide a recoverable next step.", ["After a failed tool call, the model should suggest what to do next."], ["tool call"], ["tool call", "recovery"]],
  ["ai", "不要让模型决定高风险操作的最终结果。", "Do not let the model make the final decision for high-risk actions.", ["High-risk actions should not be decided solely by the model."], ["high-risk actions"], ["risk", "decision"]],
  ["ai", "RAG 的质量取决于检索质量，而不只是模型能力。", "The quality of RAG depends on retrieval quality, not just model capability.", ["RAG is only as good as the retrieved context."], ["retrieved context"], ["RAG", "retrieval"]],
  ["ai", "我们应该把提示词版本和实验结果一起记录。", "We should record prompt versions together with experiment results.", ["Prompt versions should be tracked alongside eval results."], ["alongside"], ["prompt version", "eval"]],
  ["ai", "这个输出需要先经过安全检查再展示给用户。", "This output needs to pass a safety check before it is shown to the user.", ["Run a safety check before displaying this output to the user."], ["safety check"], ["safety", "output"]],

  ["daily", "我不是很确定，但我可以先查一下。", "I'm not entirely sure, but I can look into it first.", ["I'm not 100 percent sure, but let me check."], ["look into it"], ["uncertainty", "check"]],
  ["daily", "我明白你的意思，但我有一点不同看法。", "I see what you mean, but I have a slightly different view.", ["I understand your point, but I see it a bit differently."], ["soft disagreement"], ["opinion", "disagreement"]],
  ["daily", "你能换一种方式解释一下吗？", "Could you explain that in a different way?", ["Could you put that another way?"], ["put that another way"], ["clarification", "explain"]],
  ["daily", "我刚才没太听清最后一句。", "I did not quite catch the last sentence.", ["I missed the last part."], ["catch means hear/understand"], ["listening", "clarification"]],
  ["daily", "我需要一点时间整理我的想法。", "I need a moment to organize my thoughts.", ["Give me a second to gather my thoughts."], ["gather my thoughts"], ["thinking", "speaking"]],
  ["daily", "这件事比我一开始想的更复杂。", "This is more complicated than I initially thought.", ["It turns out to be more complex than I expected."], ["initially thought"], ["complexity", "expectation"]],
  ["daily", "我们先把最重要的事情处理掉。", "Let's deal with the most important thing first.", ["Let's handle the top priority first."], ["top priority"], ["priority", "action"]],
  ["daily", "我不想承诺一个我做不到的时间。", "I do not want to commit to a timeline I cannot meet.", ["I don't want to promise a deadline I can't deliver on."], ["commit to a timeline"], ["deadline", "promise"]],
  ["daily", "你说得有道理，我之前没有这样想过。", "That makes sense. I had not thought about it that way before.", ["You have a point; I hadn't seen it that way."], ["you have a point"], ["agreement", "perspective"]],
  ["daily", "我可能需要重新安排一下我的时间。", "I may need to rearrange my schedule.", ["I might need to adjust my schedule."], ["adjust/rearrange schedule"], ["schedule", "time"]],
  ["daily", "我们可以先试一个小版本。", "We can try a smaller version first.", ["Let's start with a smaller version."], ["smaller version"], ["scope", "try"]],
  ["daily", "这个解释对我来说更容易理解。", "This explanation is easier for me to understand.", ["That explanation is much clearer to me."], ["clearer to me"], ["understanding", "explanation"]],
  ["daily", "我不是反对，只是担心风险。", "I'm not against it; I'm just concerned about the risk.", ["I don't oppose it, but I am worried about the risks."], ["not against it"], ["risk", "concern"]],
  ["daily", "我们今天先到这里，明天继续。", "Let's stop here for today and continue tomorrow.", ["Let's call it a day and pick this up tomorrow."], ["call it a day"], ["meeting", "tomorrow"]],
  ["daily", "我想确认一下我有没有理解对。", "I want to make sure I understood correctly.", ["Let me check whether I got this right."], ["got this right"], ["confirm", "understand"]],

  ["ielts", "从长远来看，教育投资能减少社会不平等。", "In the long run, investment in education can reduce social inequality.", ["Over time, education spending can help narrow social inequality."], ["in the long run"], ["education", "inequality"]],
  ["ielts", "科技提高了效率，但也带来了新的伦理问题。", "Technology has improved efficiency, but it has also created new ethical concerns.", ["Technology boosts efficiency while raising new ethical questions."], ["while raising"], ["technology", "ethics"]],
  ["ielts", "政府不应该把所有责任都推给个人。", "Governments should not shift all responsibility onto individuals.", ["The government should not place the entire burden on individuals."], ["shift responsibility onto"], ["government", "responsibility"]],
  ["ielts", "城市化给年轻人提供了更多机会。", "Urbanization provides young people with more opportunities.", ["Urban growth gives younger generations access to more opportunities."], ["provide someone with"], ["urbanization", "opportunity"]],
  ["ielts", "过度依赖手机可能削弱面对面交流。", "Excessive reliance on smartphones may weaken face-to-face communication.", ["Relying too much on phones can reduce in-person interaction."], ["excessive reliance"], ["smartphones", "communication"]],
  ["ielts", "这个问题不能只通过提高罚款来解决。", "This problem cannot be solved simply by increasing fines.", ["Raising fines alone will not solve this issue."], ["alone will not solve"], ["law", "solution"]],
  ["ielts", "文化遗产有商业价值，但不应该被完全商品化。", "Cultural heritage has commercial value, but it should not be fully commercialized.", ["Cultural heritage can generate revenue, but it should not be treated purely as a product."], ["commercialized"], ["culture", "commerce"]],
  ["ielts", "远程工作让员工有更多灵活性。", "Remote work gives employees greater flexibility.", ["Working remotely allows employees to manage their time more flexibly."], ["greater flexibility"], ["remote work", "flexibility"]],
  ["ielts", "环境政策应该平衡经济增长和长期可持续性。", "Environmental policies should balance economic growth with long-term sustainability.", ["Policy makers need to balance growth and sustainability."], ["balance A with B"], ["environment", "growth"]],
  ["ielts", "免费公共交通可能鼓励人们减少开车。", "Free public transport may encourage people to drive less.", ["Making public transport free could reduce car use."], ["encourage people to"], ["transport", "cars"]],
  ["ielts", "家长参与教育很重要，但学校也承担关键责任。", "Parental involvement in education is important, but schools also play a crucial role.", ["Parents matter, but schools remain central to education."], ["play a crucial role"], ["parents", "schools"]],
  ["ielts", "媒体报道会影响公众对风险的感知。", "Media coverage can shape the public's perception of risk.", ["The media can influence how people perceive risk."], ["shape perception"], ["media", "risk"]],
  ["ielts", "不是所有传统都应该无条件保留。", "Not all traditions should be preserved unconditionally.", ["Some traditions may need to change over time."], ["not all"], ["tradition", "change"]],
  ["ielts", "大学教育的目的不只是找工作。", "The purpose of university education is not only to find a job.", ["University education should be about more than employment."], ["more than employment"], ["university", "purpose"]],
  ["ielts", "人工智能可能提高生产力，但也会改变就业结构。", "Artificial intelligence may improve productivity, but it will also reshape the structure of employment.", ["AI can raise productivity while changing the job market."], ["reshape employment"], ["AI", "employment"]],
  ["ielts", "公共卫生政策需要公众信任才能有效。", "Public health policies need public trust in order to be effective.", ["Public trust is essential for effective health policy."], ["in order to"], ["health", "trust"]],
  ["ielts", "学生应该学习批判性思维，而不只是记忆事实。", "Students should learn critical thinking, not just memorize facts.", ["Education should develop critical thinking rather than simple memorization."], ["rather than"], ["education", "critical thinking"]],
  ["ielts", "收入差距扩大可能导致社会紧张。", "A widening income gap may lead to social tension.", ["Growing income inequality can create social tensions."], ["lead to"], ["income gap", "society"]],
  ["ielts", "线上课程提高了可及性，但缺少课堂互动。", "Online courses improve accessibility, but they lack classroom interaction.", ["Online learning is more accessible, but it often offers less face-to-face interaction."], ["accessibility"], ["online learning", "interaction"]],
  ["ielts", "儿童广告应该受到更严格的监管。", "Advertising aimed at children should be regulated more strictly.", ["There should be stricter regulation of advertising targeting children."], ["aimed at children"], ["advertising", "children"]],
  ["ielts", "经济发展不应该以破坏生态系统为代价。", "Economic development should not come at the expense of ecosystems.", ["Growth should not be achieved by damaging ecosystems."], ["at the expense of"], ["economy", "ecosystem"]],
  ["ielts", "博物馆可以帮助年轻人理解历史。", "Museums can help young people understand history.", ["Museums make history more accessible to younger generations."], ["accessible to"], ["museum", "history"]],
  ["ielts", "工作满意度不完全取决于薪水。", "Job satisfaction does not depend entirely on salary.", ["Salary matters, but it is not the only factor behind job satisfaction."], ["depend on"], ["work", "salary"]],
  ["ielts", "社交媒体让信息传播更快，也让谣言传播更容易。", "Social media spreads information faster, but it also makes rumors easier to spread.", ["Social media accelerates both information sharing and the spread of rumors."], ["accelerates"], ["social media", "rumors"]],
  ["ielts", "惩罚可以阻止犯罪，但预防措施同样重要。", "Punishment can deter crime, but preventive measures are equally important.", ["Deterrence matters, but prevention is just as important."], ["deter crime"], ["crime", "prevention"]],
  ["ielts", "老龄化社会会增加医疗系统的压力。", "An aging society will put more pressure on the healthcare system.", ["Population aging increases pressure on healthcare services."], ["put pressure on"], ["aging", "healthcare"]],
  ["ielts", "学校应该帮助学生适应未来劳动力市场。", "Schools should help students adapt to the future labor market.", ["Education should prepare students for future changes in the job market."], ["adapt to"], ["school", "labor market"]],
  ["ielts", "国际合作对解决气候变化至关重要。", "International cooperation is essential for addressing climate change.", ["Climate change requires cooperation between countries."], ["essential for"], ["climate", "cooperation"]],
  ["ielts", "个人选择很重要，但基础设施也会影响行为。", "Individual choices matter, but infrastructure also shapes behavior.", ["People's behavior is influenced not only by choice but also by infrastructure."], ["shapes behavior"], ["infrastructure", "behavior"]],
  ["ielts", "严格的考试制度可能限制学生的创造力。", "A strict exam-oriented system may limit students' creativity.", ["Too much focus on exams can restrict creativity."], ["exam-oriented"], ["exams", "creativity"]]
].map(([category, prompt, referenceAnswer, alternatives, notes, keywords], index) => ({
  id: `${category}-${String(index + 1).padStart(3, "0")}`,
  category,
  difficulty: category === "ielts" || index % 3 === 0 ? "C1" : "B2",
  prompt,
  referenceAnswer,
  alternatives,
  notes,
  keywords
})) as Question[];

export async function getQuestions(category: Category = "all"): Promise<Question[]> {
  if (category === "all") {
    return prompts;
  }

  return prompts.filter((question) => question.category === category);
}

export function getQuestionStats() {
  return {
    total: prompts.length,
    categoryCounts
  };
}
