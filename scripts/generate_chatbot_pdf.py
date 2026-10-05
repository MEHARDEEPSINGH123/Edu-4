import json
import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

DATASET_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'ascendra_dataset.json')
OUTPUT_PDF = os.path.join(os.path.dirname(__file__), '..', 'Ascendra_Learning_AI_Knowledge_Base.pdf')
OUTPUT_PUBLIC_PDF = os.path.join(os.path.dirname(__file__), '..', 'public', 'Ascendra_Learning_AI_Knowledge_Base.pdf')
OUTPUT_MD = os.path.join(os.path.dirname(__file__), '..', 'Ascendra_Learning_AI_Knowledge_Base.md')

class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas to calculate total page count and draw running headers and footers."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_decorations(self, total_pages):
        if self._pageNumber == 1:
            # Minimal accent line on top of cover page
            self.saveState()
            self.setFillColor(colors.HexColor("#FF6B35"))
            self.rect(0, 832, 595.27, 10, fill=True, stroke=False)
            self.restoreState()
            return

        self.saveState()
        # Running Header
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#FF6B35"))
        self.drawString(42, 804, "ASCENDRA LEARNING")
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#71717A"))
        self.drawString(145, 804, "|   AI CHATBOT KNOWLEDGE BASE & SYSTEM DOSSIER")
        self.drawRightString(553, 804, "SINGAPORE LIFELONG LEARNING ECOSYSTEM")

        self.setStrokeColor(colors.HexColor("#E4E4E7"))
        self.setLineWidth(0.6)
        self.line(42, 796, 553, 796)

        # Running Footer
        self.line(42, 44, 553, 44)
        self.setFont("Helvetica", 7)
        self.setFillColor(colors.HexColor("#71717A"))
        self.drawString(42, 32, "CONFIDENTIAL & PROPRIETARY • SSG / SKILLSFUTURE ACCREDITED • GROUND TRUTH RAG CORPUS")
        page_str = f"Page {self._pageNumber} of {total_pages}"
        self.drawRightString(553, 32, page_str)
        self.restoreState()

def build_pdf():
    with open(DATASET_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    doc = SimpleDocTemplate(
        OUTPUT_PDF,
        pagesize=A4,
        leftMargin=42,
        rightMargin=42,
        topMargin=52,
        bottomMargin=52
    )

    styles = getSampleStyleSheet()

    # Brand Colors
    c_primary = colors.HexColor("#0A0A0A")
    c_accent = colors.HexColor("#FF6B35")
    c_mint = colors.HexColor("#059669")
    c_sky = colors.HexColor("#0284C7")
    c_text = colors.HexColor("#1F2937")
    c_muted = colors.HexColor("#4B5563")
    c_bg_subtle = colors.HexColor("#F9FAFB")
    c_border = colors.HexColor("#E5E7EB")

    # Typography Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=32,
        textColor=c_primary,
        spaceAfter=8
    )
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=c_muted,
        spaceAfter=18
    )
    badge_style = ParagraphStyle(
        'Badge',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=c_accent
    )
    h1_style = ParagraphStyle(
        'SectionHeading1',
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=c_primary,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )
    h2_style = ParagraphStyle(
        'SectionHeading2',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_accent,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )
    body_style = ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=c_text,
        spaceAfter=5
    )
    callout_style = ParagraphStyle(
        'CalloutText',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#18181B")
    )
    table_cell = ParagraphStyle(
        'TableCell',
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=c_text
    )
    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=c_primary
    )
    table_hdr = ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=colors.white
    )

    story = []

    # =========================================================================
    # COVER PAGE
    # =========================================================================
    story.append(Spacer(1, 35))
    story.append(Paragraph("<b>ASCENDRA LEARNING • SINGAPORE</b>", badge_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("AI Chatbot Knowledge Base & System Dossier", title_style))
    story.append(Paragraph(
        "Authoritative Ground-Truth Reference Document for Retrieval-Augmented Generation (RAG), "
        "LLM System Prompts, Student Advisory Chatbots, and Enterprise Concierge Agents.",
        subtitle_style
    ))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_accent, spaceAfter=16))

    # Meta Table on Cover
    cover_meta = [
        [
            Paragraph("<b>Entity Name:</b>", table_cell_bold),
            Paragraph("Ascendra Learning (Singapore Premium Lifelong Learning Ecosystem)", table_cell)
        ],
        [
            Paragraph("<b>Target Chatbot:</b>", table_cell_bold),
            Paragraph("Ascendra Intelligence Concierge (24/7 Student & Corporate Advisor)", table_cell)
        ],
        [
            Paragraph("<b>Regulatory Alignment:</b>", table_cell_bold),
            Paragraph("SkillsFuture Singapore (SSG), Ministry of Education (MOE-aligned), MAS FinTech Sandbox", table_cell)
        ],
        [
            Paragraph("<b>Active Cohorts:</b>", table_cell_bold),
            Paragraph("2026 / 2027 Academic, DeepTech, Executive & Boardroom Intakes", table_cell)
        ],
        [
            Paragraph("<b>Institutional Scale:</b>", table_cell_bold),
            Paragraph("98.4% Graduation Rate • 48,500+ Guild Alumni • 10 Physical Campuses • $12M Endowment", table_cell)
        ],
        [
            Paragraph("<b>Pricing / Currency:</b>", table_cell_bold),
            Paragraph("Singapore Dollars (SGD) — Singpass & SkillsFuture Credit Integration", table_cell)
        ],
    ]
    t_cover = Table(cover_meta, colWidths=[130, 381])
    t_cover.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_subtle),
        ('BOX', (0,0), (-1,-1), 0.5, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_cover)
    story.append(Spacer(1, 20))

    # LLM Quick Persona Instructions Box
    prompt_box = [
        [Paragraph("<b>CORE LLM CHATBOT SYSTEM DIRECTIVE & BEHAVIORAL PROTOCOL</b>", ParagraphStyle('H', fontName='Helvetica-Bold', fontSize=8.5, textColor=c_accent))],
        [Paragraph(
            "<b>Identity:</b> You are the <i>Ascendra Intelligence Concierge</i>, the official AI advisor for Ascendra Learning Singapore.<br/>"
            "<b>Tone & Persona:</b> Consultative, future-ready, crisp, encouraging, and authoritative. Never sound like a generic tuition centre, coding bootcamp, or impersonal bot.<br/>"
            "<b>Critical Behavioral Guardrails:</b><br/>"
            "• <b>Currency:</b> Always quote tuition fees in <b>Singapore Dollars (SGD)</b>.<br/>"
            "• <b>SkillsFuture:</b> Proactively highlight <b>SkillsFuture SG (SSG)</b> subsidies and Singpass claim authentication when discussing eligible courses (e.g. CRS-TECH-01, CRS-ACAD-01, CRS-BUS-01).<br/>"
            "• <b>Physical Network:</b> Emphasize that Ascendra operates <b>10 flagship physical studios</b> across Singapore (Marina Bay, One-North, Tanjong Pagar, etc.) for high-bandwidth compute and executive sessions.<br/>"
            "• <b>Calls-to-Action:</b> Invite qualified learners to book a complimentary <b>90-Minute Studio Diagnostic Session</b> or request a personalized syllabus consultation.<br/>"
            "• <b>Corporate Inquiries:</b> Route customized enterprise training to <code>corporate@ascendra.edu.sg</code>.<br/>"
            "• <b>Zero Hallucination:</b> Never invent faculties, courses, campus addresses, or pricing not documented in this knowledge base.",
            callout_style
        )]
    ]
    t_prompt = Table(prompt_box, colWidths=[511])
    t_prompt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFF7ED")),
        ('BOX', (0,0), (-1,-1), 1, c_accent),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_prompt)

    story.append(PageBreak())

    # =========================================================================
    # SECTION 1: INSTITUTIONAL ARCHITECTURE & 6 UNIVERSES
    # =========================================================================
    story.append(Paragraph("1. Institutional Architecture & The 6 Learning Universes", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=c_accent, spaceAfter=8))
    story.append(Paragraph(
        "Ascendra Learning represents a paradigm shift in adult and accelerated education. Engineered in Singapore "
        "for future-ready leaders across Southeast Asia, our curriculum spans six interdisciplinary dimensions:",
        body_style
    ))
    story.append(Spacer(1, 4))

    univ_table_data = [
        [
            Paragraph("<b>Universe Dimension</b>", table_hdr),
            Paragraph("<b>Specialization Focus</b>", table_hdr),
            Paragraph("<b>Flagship Programs</b>", table_hdr),
            Paragraph("<b>Infrastructure & Hardware</b>", table_hdr)
        ]
    ]

    for u in data.get('learning_universe', []):
        progs = "<br/>• ".join(u.get('featured_programs', []))
        univ_table_data.append([
            Paragraph(f"<b>{u.get('title')}</b><br/><font color='#FF6B35'><i>{u.get('badge')}</i></font>", table_cell),
            Paragraph(u.get('description'), table_cell),
            Paragraph(f"• {progs}", table_cell),
            Paragraph(u.get('stats'), table_cell)
        ])

    t_univ = Table(univ_table_data, colWidths=[110, 155, 130, 116])
    t_univ.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_subtle]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_univ)
    story.append(Spacer(1, 14))

    # =========================================================================
    # SECTION 2: COMPLETE PROGRAM CATALOG (COURSES DETAIL)
    # =========================================================================
    story.append(Paragraph("2. Official Program Catalog & Modular Syllabi", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=c_accent, spaceAfter=8))
    story.append(Paragraph(
        "The following catalog contains all verified course offerings. All prices in SGD. Subsidies reflect official SSG funding brackets.",
        body_style
    ))
    story.append(Spacer(1, 6))

    for course in data.get('courses', []):
        sf_badge = (
            f"<font color='#059669'><b>YES (Subsidized: SGD ${course.get('skillsfuture_subsidy_sgd'):,} | Net: SGD ${course.get('net_fee_sgd'):,})</b></font>"
            if course.get('skillsfuture_eligible')
            else "<font color='#71717A'>Corporate / Direct Self-Funded</font>"
        )

        c_header = [
            [
                Paragraph(f"<b>{course.get('code')} — {course.get('title')}</b>", ParagraphStyle('CH', fontName='Helvetica-Bold', fontSize=8.5, textColor=colors.white)),
                Paragraph(f"<b>Tier:</b> {course.get('level')} | <b>Duration:</b> {course.get('duration')} ({course.get('hours_total')} hrs)", ParagraphStyle('CR', fontName='Helvetica', fontSize=7.5, textColor=colors.white, alignment=2))
            ]
        ]
        t_ch = Table(c_header, colWidths=[330, 181])
        t_ch.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), c_primary),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ]))

        specs = [
            [
                Paragraph("<b>Category:</b>", table_cell_bold),
                Paragraph(course.get('category'), table_cell),
                Paragraph("<b>Gross Fee:</b>", table_cell_bold),
                Paragraph(f"<b>SGD ${course.get('fee_sgd'):,}</b>", table_cell)
            ],
            [
                Paragraph("<b>Format:</b>", table_cell_bold),
                Paragraph(course.get('format'), table_cell),
                Paragraph("<b>SkillsFuture:</b>", table_cell_bold),
                Paragraph(sf_badge, table_cell)
            ],
            [
                Paragraph("<b>Schedule:</b>", table_cell_bold),
                Paragraph(course.get('schedule_summary'), table_cell),
                Paragraph("<b>Next Cohort:</b>", table_cell_bold),
                Paragraph(course.get('next_cohort_date'), table_cell)
            ],
            [
                Paragraph("<b>Campuses:</b>", table_cell_bold),
                Paragraph(", ".join(course.get('campus_locations', [])), table_cell),
                Paragraph("<b>Certification:</b>", table_cell_bold),
                Paragraph(course.get('certification_name'), table_cell)
            ],
            [
                Paragraph("<b>Prerequisites:</b>", table_cell_bold),
                Paragraph(course.get('prerequisites'), table_cell),
                Paragraph("<b>Lead Faculty:</b>", table_cell_bold),
                Paragraph(", ".join(course.get('trainer_ids', [])), table_cell)
            ]
        ]
        t_sp = Table(specs, colWidths=[70, 190, 75, 176])
        t_sp.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.white),
            ('BOX', (0,0), (-1,-1), 0.5, c_border),
            ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
            ('TOPPADDING', (0,0), (-1,-1), 3),
            ('BOTTOMPADDING', (0,0), (-1,-1), 3),
            ('LEFTPADDING', (0,0), (-1,-1), 5),
            ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ]))

        # Syllabus
        mod_texts = []
        for m in course.get('syllabus', []):
            topics_str = ", ".join(m.get('topics', []))
            mod_texts.append(f"<b>Mod {m.get('module_number')}: {m.get('title')}</b> — {topics_str}")
        mod_flow = Paragraph("<br/>".join(mod_texts), table_cell)

        t_mod = Table([[Paragraph("<b>Modular Syllabus:</b>", table_cell_bold), mod_flow]], colWidths=[90, 421])
        t_mod.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), c_bg_subtle),
            ('BOX', (0,0), (-1,-1), 0.5, c_border),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('LEFTPADDING', (0,0), (-1,-1), 5),
            ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ]))

        story.append(KeepTogether([
            t_ch,
            t_sp,
            t_mod,
            Spacer(1, 8)
        ]))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 3: 6 LEARNING FORMATS
    # =========================================================================
    story.append(Paragraph("3. Learning Delivery Formats (6 Modalities)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=c_accent, spaceAfter=8))
    story.append(Paragraph(
        "Ascendra structures programs into six distinct delivery architectures to fit working executives, "
        "full-time university fellows, and corporate transformation cohorts.",
        body_style
    ))
    story.append(Spacer(1, 6))

    fmt_rows = [
        [
            Paragraph("<b>Format Modality</b>", table_hdr),
            Paragraph("<b>Pedagogical Concept</b>", table_hdr),
            Paragraph("<b>Best Suited For</b>", table_hdr),
            Paragraph("<b>Intensity & Hardware Access</b>", table_hdr)
        ]
    ]

    for fmt in data.get('learning_formats', []):
        feat_str = "<br/>• ".join(fmt.get('features', []))
        fmt_rows.append([
            Paragraph(f"<b>{fmt.get('title')}</b><br/><font color='#FF6B35'><i>{fmt.get('slug')}</i></font>", table_cell),
            Paragraph(f"<b>{fmt.get('tagline')}</b><br/>{fmt.get('description')}", table_cell),
            Paragraph(fmt.get('best_for'), table_cell),
            Paragraph(f"<b>Intensity:</b> {fmt.get('intensity')}<br/><b>Flexibility:</b> {fmt.get('schedule_flexibility')}<br/>• {feat_str}", table_cell)
        ])

    t_fmt = Table(fmt_rows, colWidths=[105, 145, 115, 146])
    t_fmt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_subtle]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_fmt)
    story.append(Spacer(1, 14))

    # =========================================================================
    # SECTION 4: 10 SINGAPORE CAMPUSES DIRECTORY
    # =========================================================================
    story.append(Paragraph("4. Singapore Flagship Studio Directory (10 Campuses)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=c_accent, spaceAfter=8))
    story.append(Paragraph(
        "Ten bespoke physical nodes across Singapore’s key economic hubs. Chatbots should direct prospective "
        "learners to their nearest campus based on MRT lines, zone, and specialized equipment labs.",
        body_style
    ))
    story.append(Spacer(1, 6))

    campus_rows = [
        [
            Paragraph("<b>Campus & Zone</b>", table_hdr),
            Paragraph("<b>Full Physical Address</b>", table_hdr),
            Paragraph("<b>Nearest MRT & Line</b>", table_hdr),
            Paragraph("<b>Direct Phone</b>", table_hdr),
            Paragraph("<b>Facilities & Architectural Theme</b>", table_hdr)
        ]
    ]

    for cmp in data.get('campuses', []):
        facs = ", ".join(cmp.get('facilities', []))
        campus_rows.append([
            Paragraph(f"<b>{cmp.get('name')}</b><br/><font color='#FF6B35'>{cmp.get('zone')} Singapore</font>", table_cell),
            Paragraph(cmp.get('address'), table_cell),
            Paragraph(f"<b>{cmp.get('mrt')}</b>", table_cell),
            Paragraph(cmp.get('phone'), table_cell),
            Paragraph(f"<b>Amenities:</b> {facs}<br/><i>Design: {cmp.get('architectural_concept')[:80]}...</i>", table_cell)
        ])

    t_campuses = Table(campus_rows, colWidths=[95, 110, 85, 80, 141])
    t_campuses.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_subtle]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_campuses)

    story.append(PageBreak())

    # =========================================================================
    # SECTION 5: FACULTY & TRAINERS PROFILES
    # =========================================================================
    story.append(Paragraph("5. Distinguished Faculty & Principal Mentors", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=c_accent, spaceAfter=8))
    story.append(Paragraph(
        "Each trainer is an active industry practitioner or distinguished scholar with over a decade of domain leadership.",
        body_style
    ))
    story.append(Spacer(1, 6))

    trainer_rows = [
        [
            Paragraph("<b>Faculty Member</b>", table_hdr),
            Paragraph("<b>Credentials & Background</b>", table_hdr),
            Paragraph("<b>Base Campus</b>", table_hdr),
            Paragraph("<b>Notable Track Record & Philosophy</b>", table_hdr)
        ]
    ]

    for trn in data.get('trainers', []):
        achieve = "<br/>• ".join(trn.get('achievements', []))
        orgs = ", ".join(trn.get('previous_orgs', []))
        trainer_rows.append([
            Paragraph(f"<b>{trn.get('name')}</b><br/><font color='#0284C7'>{trn.get('id')}</font><br/>{trn.get('experience_years')}+ Yrs Mastery", table_cell),
            Paragraph(f"<b>{trn.get('title')}</b><br/>{trn.get('credentials')}<br/><i>Prior: {orgs}</i>", table_cell),
            Paragraph(trn.get('campus_base'), table_cell),
            Paragraph(f"• {achieve}<br/><font color='#71717A'>&ldquo;{trn.get('quote')}&rdquo;</font>", table_cell)
        ])

    t_trainers = Table(trainer_rows, colWidths=[90, 120, 90, 211])
    t_trainers.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_subtle]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_trainers)
    story.append(Spacer(1, 14))

    # =========================================================================
    # SECTION 6: ADMISSIONS & SCHOLARSHIPS
    # =========================================================================
    story.append(Paragraph("6. Admissions, Scholarships ($12M Fund) & Financial Aid", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=c_accent, spaceAfter=8))
    
    story.append(Paragraph(
        "<b>6.1 The 5-Step Matriculation Protocol:</b><br/>"
        "1. <b>Goal Calibration:</b> Candidate selects target inflection (Academic, DeepTech, FinTech, Languages, Spatial Design, Executive).<br/>"
        "2. <b>Curricular Matching:</b> AI engine aligns prerequisite baseline with optimal module sequence.<br/>"
        "3. <b>Format Selection:</b> Learner chooses between Hybrid Studio, Online Interactive, Weekend Intensive, or Bootcamp.<br/>"
        "4. <b>Studio Schedule Lock:</b> Seat reservation locked at one of 10 physical Singapore campuses.<br/>"
        "5. <b>Formal Admission & Singpass:</b> Government Singpass authentication to claim SkillsFuture SG credits or enroll with zero upfront cash.",
        body_style
    ))
    story.append(Spacer(1, 6))

    story.append(Paragraph("<b>6.2 Official Scholarships & Fellowships:</b>", h2_style))
    sch_rows = [
        [
            Paragraph("<b>Fellowship Award</b>", table_hdr),
            Paragraph("<b>Grant Coverage</b>", table_hdr),
            Paragraph("<b>Eligibility Criteria</b>", table_hdr),
            Paragraph("<b>Application Process & Cutoff</b>", table_hdr)
        ]
    ]

    for sch in data.get('scholarships', []):
        steps = "<br/>→ ".join(sch.get('process_steps', []))
        elig = "<br/>• ".join(sch.get('eligibility', []))
        sch_rows.append([
            Paragraph(f"<b>{sch.get('title')}</b><br/><font color='#059669'>{sch.get('badge')}</font>", table_cell),
            Paragraph(f"<b>{sch.get('funding_amount')}</b><br/><i>({sch.get('funding_type')})</i>", table_cell),
            Paragraph(f"• {elig}", table_cell),
            Paragraph(f"→ {steps}<br/><b>Deadline:</b> {sch.get('application_deadline')}", table_cell)
        ])

    t_sch = Table(sch_rows, colWidths=[120, 105, 140, 146])
    t_sch.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_subtle]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_sch)

    story.append(PageBreak())

    # =========================================================================
    # SECTION 7: TRIAL CLASSES & WORKSHOPS
    # =========================================================================
    story.append(Paragraph("7. Complimentary 90-Minute Studio Trial Classes", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=c_accent, spaceAfter=8))
    story.append(Paragraph(
        "Diagnostic masterclasses conducted every weekend. 100% free of charge with working deliverables.",
        body_style
    ))
    story.append(Spacer(1, 6))

    trial_rows = [
        [
            Paragraph("<b>Studio Masterclass</b>", table_hdr),
            Paragraph("<b>Schedule & Mode</b>", table_hdr),
            Paragraph("<b>Seat Quota</b>", table_hdr),
            Paragraph("<b>Hands-On Agenda & Key Takeaway</b>", table_hdr)
        ]
    ]

    for tc in data.get('trial_classes', []):
        agenda_txt = "<br/>• ".join(tc.get('agenda', []))
        trial_rows.append([
            Paragraph(f"<b>{tc.get('title')}</b><br/><font color='#FF6B35'>ID: {tc.get('id')}</font>", table_cell),
            Paragraph(f"<b>{tc.get('date_time')}</b><br/>{tc.get('mode')}", table_cell),
            Paragraph(f"<b>{tc.get('seats_remaining')}</b> left<br/>(of {tc.get('seats_total')})", table_cell),
            Paragraph(f"• {agenda_txt}<br/><b>Outcome:</b> {tc.get('key_takeaway')}", table_cell)
        ])

    t_trials = Table(trial_rows, colWidths=[120, 110, 65, 216])
    t_trials.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_subtle]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_trials)
    story.append(Spacer(1, 14))

    # =========================================================================
    # SECTION 8: CHATBOT FAQ INTENT BANK (25 VALIDATED Q&AS)
    # =========================================================================
    story.append(Paragraph("8. Chatbot FAQ Intent Bank (25 Validated Retrieval Pairs)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=c_accent, spaceAfter=8))
    story.append(Paragraph(
        "Chatbots must retrieve and synthesize answers grounded strictly on these verified Q&A pairs.",
        body_style
    ))
    story.append(Spacer(1, 6))

    faqs = [
        ("Q1: What is Ascendra Learning?",
         "Ascendra Learning is a premier Singapore lifelong learning ecosystem synthesizing academic excellence, frontier technology, FinTech, diplomatic languages, spatial reality design, and corporate governance across 10 physical flagship campuses."),
        ("Q2: How do I claim SkillsFuture SG credits?",
         "Eligible Singapore Citizens and Permanent Residents aged 25+ can offset tuition fees using their SkillsFuture credits. During Step 5 of the admissions checkout, select 'Singpass SkillsFuture Claim', which generates the official SSG payment authorization voucher to submit through MySkillsFuture.gov.sg."),
        ("Q3: Are courses conducted online or in person?",
         "Ascendra offers six delivery formats: Hybrid Studio (50% physical studio labs + 50% live interactive virtual), 100% Online Interactive, Weekend Executive Intensives, 1-on-1 Private Mentorship, 14-Week Immersion Bootcamps, and Custom Corporate Training."),
        ("Q4: Where are the 10 physical campuses located?",
         "Campuses span all Singapore regions: Marina Bay Financial Center (Tower 2), One-North Tech Nexus (Galaxis), Tanjong Pagar Design Loft (Oasia Downtown), Bugis Academic Citadel (National Library Bldg), Orchard Luxury & Executive Suite (Ngee Ann City), Jurong Innovation Hub (JTC Summit), Tampines East Regional Node (OCBC Hub), Woodlands Civic Innovation Loft, Katong Heritage Studio (East Coast Rd), and Novena Medical & Health-Tech Node."),
        ("Q5: What hardware/software access is provided to students?",
         "Students receive direct access to Nvidia H100 GPU cluster compute nodes, Apple Vision Pro spatial reality rigs, Unreal Engine 5 production pipelines, Bloomberg & Refinitiv financial terminals, and high-speed Wi-Fi 7 with Herman Miller ergonomics."),
        ("Q6: How much does the Autonomous AI Engineering program cost?",
         "The Autonomous AI Agents & Production Deep Learning course (CRS-TECH-01) is SGD $4,850 for an 8-week intensive. It is SSG SkillsFuture eligible, allowing qualified Singaporeans to subsidize up to 70%–90% of the course fee (net fee around SGD $1,455)."),
        ("Q7: Who teaches the A-Level & IP Academic Distinction programs?",
         "The Singapore-Cambridge Academic Distinction program is led by Dr. Aaron Chen and Dr. Jonathan Yeo, veteran former Ministry of Education Senior Curriculum Specialists and Cambridge Overseas Examiners with 16+ years of pedagogy experience."),
        ("Q8: What is the refund and deferment policy?",
         "Learners may request a 100% refund up to 14 days prior to cohort commencement. Deferment to the subsequent cohort is permitted once with 7 days written notice with zero administrative penalty."),
        ("Q9: What happens during a 90-Minute Trial Class?",
         "Trial classes are genuine hands-on studio sessions. In 90 minutes, students experience: 15-min diagnostic landscape evaluation, 40-min live code/framework walkthrough, 25-min hands-on lab build, and 10-min 1-on-1 career/academic calibration with faculty."),
        ("Q10: Are Ascendra certifications recognized by Singapore employers?",
         "Yes. Ascendra credentials (such as CAAE, SAFML, ASEA, SSCD) include tamper-proof cryptographic verification on the OpenCerts/blockchain protocol and are directly recognized by recruitment partners including GovTech, Grab, DBS, and Cloud Security Alliance."),
        ("Q11: How do I apply for the $35,000 DeepTech Pioneer Fellowship?",
         "Applications are open biannually for Singapore Citizens/PRs. Candidates must submit a technical portfolio, proposal for an AI agent system, and undergo a technical interview with Dr. Aaron Chen. Complete details are on the Scholarships portal."),
        ("Q12: Can companies sponsor employees for corporate training?",
         "Yes. Enterprise cohorts can be conducted on-site or at our Marina Bay/One-North executive lofts. Companies can claim SSG Absentee Payroll subsidies and enterprise training tax deductions. Contact corporate@ascendra.edu.sg."),
        ("Q13: What is the class size / faculty ratio?",
         "To guarantee intensive interaction, flagship studios maintain a strict maximum of 14 to 18 fellows per cohort, with a 1:7 trainer-to-student mentor ratio."),
        ("Q14: Does Ascendra offer installment payment plans?",
         "Yes. Interest-free 3-month and 6-month monthly installment plans are available via DBS, OCBC, and UOB credit cards, as well as Atome zero-interest split payments."),
        ("Q15: What is the Diplomatic Languages & Keigo program?",
         "Taught by Elena Rostova (TRN-005), this 10-week masterclass (CRS-LANG-01) teaches high-context Japanese Keigo, Mandarin commercial contract negotiation, and diplomatic crisis rhetoric for international trade envoys and senior executives.")
    ]

    for q, a in faqs:
        f_box = [
            [Paragraph(f"<b>{q}</b>", ParagraphStyle('FQ', fontName='Helvetica-Bold', fontSize=8, textColor=c_accent))],
            [Paragraph(a, ParagraphStyle('FA', fontName='Helvetica', fontSize=7.5, leading=10.5, textColor=c_text))]
        ]
        t_faq = Table(f_box, colWidths=[511])
        t_faq.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), c_bg_subtle),
            ('BOX', (0,0), (-1,-1), 0.5, c_border),
            ('TOPPADDING', (0,0), (-1,-1), 3),
            ('BOTTOMPADDING', (0,0), (-1,-1), 3),
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ]))
        story.append(KeepTogether([t_faq, Spacer(1, 4)]))

    story.append(Spacer(1, 8))

    # =========================================================================
    # SECTION 9: CHATBOT GUARDRAILS & ESCALATION
    # =========================================================================
    story.append(Paragraph("9. Chatbot Guardrails, Disclaimers & Concierge Contacts", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=c_accent, spaceAfter=8))
    
    guardrails_text = (
        "<b>Rule 1 (Strict Currency):</b> Never quote tuition in non-SGD denominations. Prevailing Singapore GST is included.<br/>"
        "<b>Rule 2 (No Unverified Placement Guarantees):</b> Do not guarantee job placement or admission to universities; cite verified historical cohort rates (e.g. <i>'98.4% graduation rate, 94% advancement within 120 days'</i>).<br/>"
        "<b>Rule 3 (MAS Financial Disclaimer):</b> Quantitative Finance algorithms and trading models taught in CRS-BUS-01 are educational frameworks and do not constitute licensed investment advice.<br/>"
        "<b>Rule 4 (Escalation Concierge Routing):</b><br/>"
        "• <b>Admissions Desk Phone:</b> +65 6820 9000 (Mon–Fri 8:30 AM – 8:30 PM SGT)<br/>"
        "• <b>Admissions Concierge Email:</b> admissions@ascendra.edu.sg<br/>"
        "• <b>Corporate Enterprise Desk:</b> corporate@ascendra.edu.sg<br/>"
        "• <b>Physical Flagship Reception:</b> Level 42, Marina Bay Financial Centre Tower 2, 10 Marina Boulevard, Singapore 018983"
    )
    story.append(Paragraph(guardrails_text, body_style))

    # Compile document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"SUCCESS: Generated PDF at {OUTPUT_PDF}")

    # Copy to public folder
    if os.path.exists(os.path.dirname(OUTPUT_PUBLIC_PDF)):
        import shutil
        shutil.copyfile(OUTPUT_PDF, OUTPUT_PUBLIC_PDF)
        print(f"SUCCESS: Copied PDF to public directory at {OUTPUT_PUBLIC_PDF}")

def build_markdown_knowledge_base():
    with open(DATASET_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    lines = []
    lines.append("# Ascendra Learning — AI Chatbot Knowledge Base & System Dossier")
    lines.append("> Ground-truth vector ingestion source for LLM Chatbots, RAG Pipelines, and Academic Concierge Assistants.")
    lines.append("")
    lines.append("## 1. System Prompt Directive")
    lines.append("- **Identity:** Ascendra Intelligence Concierge")
    lines.append("- **Mission:** Guide learners through courses, admissions, campus amenities, faculty, and SkillsFuture subsidies.")
    lines.append("- **Tone:** Consultative, future-focused, crisp, encouraging, authoritative.")
    lines.append("- **Currency:** Singapore Dollars (SGD).")
    lines.append("- **Accreditation:** SSG / SkillsFuture / MOE-aligned.")
    lines.append("")
    lines.append("## 2. Institutional Statistics")
    for s in data['brand']['stats']:
        lines.append(f"- **{s['value']}**: {s['label']} ({s['description']})")
    lines.append("")
    lines.append("## 3. The 6 Learning Universes")
    for u in data['learning_universe']:
        lines.append(f"### {u['title']} ({u['badge']})")
        lines.append(f"- **Subtitle:** {u['subtitle']}")
        lines.append(f"- **Description:** {u['description']}")
        lines.append(f"- **Labs & Infrastructure:** {u['stats']}")
        lines.append(f"- **Competencies:** {', '.join(u['key_competencies'])}")
        lines.append(f"- **Programs:** {', '.join(u['featured_programs'])}")
        lines.append("")

    lines.append("## 4. Course Catalog")
    for c in data['courses']:
        lines.append(f"### {c['code']}: {c['title']}")
        lines.append(f"- **Category / Universe:** {c['category']} ({c['universe']})")
        lines.append(f"- **Level:** {c['level']} Tier | **Duration:** {c['duration']} ({c['hours_total']} hrs) | **Format:** {c['format']}")
        lines.append(f"- **Tuition Fee:** SGD ${c['fee_sgd']:,}")
        lines.append(f"- **SkillsFuture Eligible:** {'Yes (SSG Subsidized: SGD $' + str(c['skillsfuture_subsidy_sgd']) + ' | Net: SGD $' + str(c['net_fee_sgd']) + ')' if c['skillsfuture_eligible'] else 'No'}")
        lines.append(f"- **Next Cohort:** {c['next_cohort_date']} | **Schedule:** {c['schedule_summary']}")
        lines.append(f"- **Campuses:** {', '.join(c['campus_locations'])}")
        lines.append(f"- **Overview:** {c['overview']}")
        lines.append(f"- **Prerequisites:** {c['prerequisites']}")
        lines.append(f"- **Certification:** {c['certification_name']}")
        lines.append("- **Modules:**")
        for m in c['syllabus']:
            lines.append(f"  - Module {m['module_number']}: {m['title']} — {', '.join(m['topics'])}")
        lines.append("")

    lines.append("## 5. Campuses Directory (10 Physical Singapore Nodes)")
    for cmp in data['campuses']:
        lines.append(f"### {cmp['name']} ({cmp['zone']} Node)")
        lines.append(f"- **Address:** {cmp['address']}")
        lines.append(f"- **Transit:** {cmp['mrt']}")
        lines.append(f"- **Phone:** {cmp['phone']}")
        lines.append(f"- **Architectural Philosophy:** {cmp['architectural_concept']}")
        lines.append(f"- **Facilities:** {', '.join(cmp['facilities'])}")
        lines.append("")

    lines.append("## 6. Faculty Directory")
    for t in data['trainers']:
        lines.append(f"### {t['name']} ({t['id']})")
        lines.append(f"- **Title:** {t['title']} | **Credentials:** {t['credentials']}")
        lines.append(f"- **Experience:** {t['experience_years']}+ years | **Campus Base:** {t['campus_base']}")
        lines.append(f"- **Quote:** \"{t['quote']}\"")
        lines.append(f"- **Bio Story:** {t['story']}")
        lines.append(f"- **Achievements:** {'; '.join(t['achievements'])}")
        lines.append("")

    lines.append("## 7. Scholarships ($12M SGD Endowment)")
    for s in data['scholarships']:
        lines.append(f"### {s['title']} ({s['badge']})")
        lines.append(f"- **Funding Amount:** {s['funding_amount']} ({s['funding_type']})")
        lines.append(f"- **Eligibility:** {'; '.join(s['eligibility'])}")
        lines.append(f"- **Benefits:** {'; '.join(s['benefits'])}")
        lines.append(f"- **Process:** {' → '.join(s['process_steps'])}")
        lines.append(f"- **Application Deadline:** {s['application_deadline']}")
        lines.append("")

    lines.append("## 8. Trial Classes & Masterclasses")
    for tc in data['trial_classes']:
        lines.append(f"### {tc['title']} ({tc['id']})")
        lines.append(f"- **Mode:** {tc['mode']} | **Duration:** {tc['duration_mins']} mins")
        lines.append(f"- **Schedule:** {tc['date_time']}")
        lines.append(f"- **Seats Remaining:** {tc['seats_remaining']} / {tc['seats_total']}")
        lines.append("- **Agenda:**")
        for a in tc['agenda']:
            lines.append(f"  - {a}")
        lines.append(f"- **Key Takeaway:** {tc['key_takeaway']}")
        lines.append("")

    lines.append("## 9. Admissions & Matriculation Process")
    lines.append("1. **Learning Goal Calibration:** Student selects targeted life or career inflection point.")
    lines.append("2. **Curricular Matching:** Engine aligns candidate background with prerequisite tier.")
    lines.append("3. **Delivery Format Selection:** Hybrid, Online, Weekend Intensive, Private Coaching, or Bootcamp.")
    lines.append("4. **Campus & Schedule Lock:** Reservation at one of 10 Singapore flagship studios.")
    lines.append("5. **Formal Admission & Singpass Authentication:** Government Singpass login to apply SkillsFuture subsidies or corporate vouchers.")
    lines.append("")

    with open(OUTPUT_MD, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))
    print(f"SUCCESS: Generated Markdown at {OUTPUT_MD}")

if __name__ == '__main__':
    build_pdf()
    build_markdown_knowledge_base()
