indexTemplate = nil;
faqTemplateDe = nil;
faqTemplateEn = nil;

-- load the templates
do
    local indexTemplateFile = io.open("templates/index.html", "r")
    indexTemplate = pandoc.template.compile(indexTemplateFile:read("a"), "templates/index.html")
    indexTemplateFile:close();
    local faqTemplateDeFile = io.open("templates/faq-de.html", "r")
    faqTemplateDe = pandoc.template.compile(faqTemplateDeFile:read("a"), "templates/faq-de.html")
    faqTemplateDeFile:close();
    local faqTemplateEnFile = io.open("templates/faq-en.html", "r")
    faqTemplateEn = pandoc.template.compile(faqTemplateEnFile:read("a"), "templates/faq-en.html")
    faqTemplateEnFile:close();
end

faqs = {};

-- read in all the faqs
for _,filename in pairs(pandoc.system.list_directory("faqs")) do
    local id = string.match(filename, "^[0-9]+_(.+)%.json$")
    if id ~= nil then
        local file = io.open("faqs/" .. filename, "r")
        local faq = pandoc.json.decode(file:read("a"), false)
        faq.id = id
        table.insert(faqs, faq);
        file:close()
    end
end

function renderMarkup (markdown)
    return pandoc.write(pandoc.read(markdown), "html")
end

function processQuestions (questions)
    for _,question in pairs(questions) do
        if question.de then
            local id = question.de.q
            id = string.lower(id)
            id = string.gsub(id, "ä", "ae")
            id = string.gsub(id, "ö", "oe")
            id = string.gsub(id, "ü", "ue")
            id = string.gsub(id, "ß", "ss")
            id = string.gsub(id, "-", "")
            id = string.gsub(id, " ", "-")
            id = string.gsub(id, "[^0-9a-z%-]", "")
            question.de.id = id
            question.de.a = renderMarkup(question.de.a)
        end
        if question.en then
            local id = question.en.q
            id = string.lower(id)
            id = string.gsub(id, "-", "")
            id = string.gsub(id, " ", "-")
            id = string.gsub(id, "[^0-9a-z%-]", "")
            question.en.id = id
            question.en.a = renderMarkup(question.en.a)
        end
    end
end

-- process the faqs
for _,faq in pairs(faqs) do
    if faq.de then
        faq.de.intro = renderMarkup(faq.de.intro)
    end
    if faq.en then
        faq.en.intro = renderMarkup(faq.en.intro)
    end
    processQuestions(faq.questions)
    if faq.sections then
        for _,section in pairs(faq.sections) do
            processQuestions(section.questions)
            if faq.sections then
                for _,subsection in pairs(section.subsections) do
                    processQuestions(subsection.questions)
                end
            end
        end
    end
end

-- make a directory for the output
pandoc.system.make_directory("public", true)

-- build the index page
do
    local doc = pandoc.template.apply(indexTemplate, {
        faqs = faqs
    })
    local str = pandoc.layout.render(doc)
    local file = io.open("public/index.html", "w")
    file:write(str)
    file:close();
end

-- build the faq pages
for _,faq in pairs(faqs) do
    pandoc.system.make_directory("public/" .. faq.id, true)
    if faq.de then
        pandoc.system.make_directory("public/" .. faq.id .. "/de", true)
        local doc = pandoc.template.apply(faqTemplateDe, {
            faq = faq
        })
        local str = pandoc.layout.render(doc)
        local file = io.open("public/" .. faq.id .. "/de/index.html", "w")
        file:write(str)
        file:close();
    end
    if faq.en then
        pandoc.system.make_directory("public/" .. faq.id .. "/en", true)
        local doc = pandoc.template.apply(faqTemplateEn, {
            faq = faq
        })
        local str = pandoc.layout.render(doc)
        local file = io.open("public/" .. faq.id .. "/en/index.html", "w")
        file:write(str)
        file:close();
    end
end
