// src/data/mockData.js

export const mockUsers = [
    {
        id: 1,
        fullName: 'Alexander Omondi',
        email: 'admin@optivistax.com',
        password: 'password123',
        phone: '+254 700 123 456',
        company: 'Optivis Tax Advisory',
        role: 'admin',
        joinedDate: '2023-01-10',
        status: 'active'
    },
    {
        id: 2,
        fullName: 'David Kamau',
        email: 'client@optivistax.com',
        password: 'password123',
        phone: '+254 712 345 678',
        company: 'Savannah Logistics Ltd',
        role: 'client',
        joinedDate: '2024-01-15',
        status: 'active'
    },
    {
        id: 3,
        fullName: 'Sarah Wanjiku',
        email: 'sarah.w@apextech.co.ke',
        password: 'password123',
        phone: '+254 722 987 654',
        company: 'Apex Tech Solutions',
        role: 'client',
        joinedDate: '2024-02-20',
        status: 'active'
    },
    {
        id: 4,
        fullName: 'Michael Kiprop',
        email: 'm.kiprop@riftventures.com',
        password: 'password123',
        phone: '+254 733 456 789',
        company: 'Rift Ventures Africa',
        role: 'client',
        joinedDate: '2024-03-05',
        status: 'active'
    },
    {
        id: 5,
        fullName: 'Grace Muthoni',
        email: 'grace@muthonilaw.com',
        password: 'password123',
        phone: '+254 744 567 890',
        company: 'Muthoni & Partners Advocates',
        role: 'client',
        joinedDate: '2024-04-12',
        status: 'inactive'
    }
];

export const mockServices = [
    {
        id: 1,
        title: 'Tax Advisory & Compliance',
        slug: 'tax-advisory-compliance',
        category: 'Advisory',
        description: 'Comprehensive tax advisory, return preparation, and full statutory compliance with KRA regulations.',
        basePrice: 45000,
        icon: 'Shield',
        active: true,
        features: [
            'Monthly & annual VAT/PAYE filing',
            'Corporate tax computation & return filing',
            'Withholding tax management',
            'Tax health checks & risk assessment'
        ]
    },
    {
        id: 2,
        title: 'Audit Support & Dispute Resolution',
        slug: 'audit-support',
        category: 'Compliance',
        description: 'Expert technical representation and dispute resolution during KRA desk and comprehensive tax audits.',
        basePrice: 85000,
        icon: 'CheckCircle',
        active: true,
        features: [
            'Audit readiness evaluation',
            'Direct KRA representation & correspondence',
            'Tax appeals tribunal submission drafting',
            'Penalty and interest waiver applications'
        ]
    },
    {
        id: 3,
        title: 'International Tax & Transfer Pricing',
        slug: 'international-tax',
        category: 'International',
        description: 'Cross-border tax structuring, transfer pricing documentation, and double tax agreement (DTA) advisory.',
        basePrice: 120000,
        icon: 'Globe',
        active: true,
        features: [
            'Transfer pricing policy documentation',
            'Local file and master file preparation',
            'Cross-border withholding tax structuring',
            'BEPS compliance advisory'
        ]
    },
    {
        id: 4,
        title: 'Corporate Tax Strategy & Restructuring',
        slug: 'corporate-tax-strategy',
        category: 'Corporate',
        description: 'Strategic tax optimization for mergers, acquisitions, restructuring, and investment vehicles in East Africa.',
        basePrice: 95000,
        icon: 'TrendingUp',
        active: true,
        features: [
            'M&A tax due diligence',
            'Corporate restructuring tax minimization',
            'Capital allowance & investment deduction optimization',
            'Holding company structuring'
        ]
    },
    {
        id: 5,
        title: 'Personal & Expatriate Tax Solutions',
        slug: 'personal-tax-solutions',
        category: 'Personal',
        description: 'Bespoke tax planning and wealth preservation for high-net-worth individuals, directors, and expatriates.',
        basePrice: 35000,
        icon: 'Users',
        active: true,
        features: [
            'Individual income tax return preparation',
            'Expatriate tax equalization and dual-residency advice',
            'Trust and estate tax planning',
            'Capital gains and investment income tax'
        ]
    },
    {
        id: 6,
        title: 'Business Registration & Tax Pin Setup',
        slug: 'business-registration',
        category: 'Registration',
        description: 'End-to-end business incorporation, KRA PIN registration, and initial statutory compliance onboarding.',
        basePrice: 25000,
        icon: 'FileText',
        active: true,
        features: [
            'BRS company incorporation assistance',
            'Company & director KRA PIN registration',
            'VAT and PAYE obligation registration',
            'eTIMS integration setup and training'
        ]
    }
];

export const mockRequests = [
    {
        id: 1,
        userId: 2,
        serviceTitle: 'Tax Advisory & Compliance',
        requestNumber: 'REQ-2024-001',
        status: 'in_progress',
        amount: 45000,
        paymentStatus: 'paid',
        date: '2024-11-20',
        description: 'Annual corporate income tax return filing for financial year ended Dec 2023 with capital allowance review.',
        documents: [
            { id: 1, name: 'Audited_Financial_Statements_2023.pdf', size: '2.4 MB', date: '2024-11-20', url: '#' },
            { id: 2, name: 'Trial_Balance_Dec_2023.xlsx', size: '850 KB', date: '2024-11-20', url: '#' }
        ],
        timeline: [
            { status: 'pending', date: '2024-11-20 09:30', note: 'Request submitted by client' },
            { status: 'in_review', date: '2024-11-20 14:15', note: 'Assigned to Senior Tax Consultant Alexander Omondi' },
            { status: 'in_progress', date: '2024-11-21 10:00', note: 'Drafting computations and capital deduction schedules' }
        ],
        receipt: {
            receiptNumber: 'REC-2024-089',
            issuedDate: '2024-11-20',
            amount: 45000,
            downloadUrl: '#'
        }
    },
    {
        id: 2,
        userId: 2,
        serviceTitle: 'Audit Support & Dispute Resolution',
        requestNumber: 'REQ-2024-002',
        status: 'completed',
        amount: 85000,
        paymentStatus: 'paid',
        date: '2024-10-15',
        description: 'Representation in response to KRA desk audit query regarding input VAT claims.',
        documents: [
            { id: 1, name: 'KRA_Audit_Notice_Oct2024.pdf', size: '1.2 MB', date: '2024-10-15', url: '#' },
            { id: 2, name: 'Tax_Clearance_Certificate.pdf', size: '450 KB', date: '2024-11-05', url: '#' }
        ],
        timeline: [
            { status: 'pending', date: '2024-10-15 11:00', note: 'Request submitted' },
            { status: 'in_progress', date: '2024-10-16 09:00', note: 'Reconciliation of input VAT invoices completed' },
            { status: 'completed', date: '2024-11-05 16:30', note: 'KRA confirmation and closure letter received' }
        ],
        receipt: {
            receiptNumber: 'REC-2024-065',
            issuedDate: '2024-10-16',
            amount: 85000,
            downloadUrl: '#'
        }
    },
    {
        id: 3,
        userId: 2,
        serviceTitle: 'Business Registration & Tax Pin Setup',
        requestNumber: 'REQ-2024-003',
        status: 'pending',
        amount: 25000,
        paymentStatus: 'unpaid',
        date: '2024-12-01',
        description: 'New subsidiary company registration and VAT obligation onboarding.',
        documents: [
            { id: 1, name: 'Director_ID_Copies.pdf', size: '1.8 MB', date: '2024-12-01', url: '#' }
        ],
        timeline: [
            { status: 'pending', date: '2024-12-01 08:45', note: 'Request submitted and awaiting document review' }
        ],
        receipt: null
    },
    {
        id: 4,
        userId: 3,
        serviceTitle: 'International Tax & Transfer Pricing',
        requestNumber: 'REQ-2024-004',
        status: 'in_progress',
        amount: 120000,
        paymentStatus: 'paid',
        date: '2024-11-25',
        description: 'Transfer pricing local documentation and benchmarking study for regional software licensing.',
        documents: [
            { id: 1, name: 'Intercompany_Agreement_Draft.pdf', size: '3.1 MB', date: '2024-11-25', url: '#' }
        ],
        timeline: [
            { status: 'pending', date: '2024-11-25 10:00', note: 'Request submitted' },
            { status: 'in_progress', date: '2024-11-26 14:00', note: 'Benchmarking study under review' }
        ],
        receipt: {
            receiptNumber: 'REC-2024-098',
            issuedDate: '2024-11-25',
            amount: 120000,
            downloadUrl: '#'
        }
    },
    {
        id: 5,
        userId: 4,
        serviceTitle: 'Corporate Tax Strategy & Restructuring',
        requestNumber: 'REQ-2024-005',
        status: 'completed',
        amount: 95000,
        paymentStatus: 'paid',
        date: '2024-09-10',
        description: 'Tax due diligence for pre-series A capital injection.',
        documents: [
            { id: 1, name: 'Tax_Due_Diligence_Report.pdf', size: '4.5 MB', date: '2024-09-28', url: '#' }
        ],
        timeline: [
            { status: 'completed', date: '2024-09-28 17:00', note: 'Final advisory memorandum submitted' }
        ],
        receipt: {
            receiptNumber: 'REC-2024-042',
            issuedDate: '2024-09-10',
            amount: 95000,
            downloadUrl: '#'
        }
    }
];

export const mockChatMessages = [
    {
        id: 1,
        requestId: 1,
        senderId: 1,
        message: 'Hello David, we have received your audited financial statements and started working on the capital deductions review.',
        timestamp: '2024-11-20 14:30',
        read: true
    },
    {
        id: 2,
        requestId: 1,
        senderId: 2,
        message: 'Thank you Alexander. Please note that we added new warehouse equipment in Q3 which should qualify for investment allowances.',
        timestamp: '2024-11-20 15:10',
        read: true
    },
    {
        id: 3,
        requestId: 1,
        senderId: 1,
        message: 'Understood. We will apply the 50% first-year investment deduction under the First Schedule of the Income Tax Act.',
        timestamp: '2024-11-21 10:15',
        read: true
    }
];

export const mockBlogPosts = [
    {
        id: 1,
        slug: 'kenya-tax-changes-2024',
        title: 'Key Tax Changes in Kenya for 2024: What Businesses Need to Know',
        excerpt: 'Stay ahead of the latest tax regulatory changes in Kenya. We break down the Finance Act 2024 and its implications for businesses.',
        content: 'The Finance Act introduces several changes including modifications to withholding tax thresholds, eTIMS compliance requirements, and digital asset tax obligations...',
        category: 'Kenyan Tax Updates',
        author: 'Alexander Omondi',
        date: '2024-12-15',
        readTime: '8 min read',
        status: 'published',
        image: '/blog/tax-changes.jpg',
        featured: true
    },
    {
        id: 2,
        slug: 'international-tax-planning-strategies',
        title: '5 International Tax Planning Strategies for Multinational Corporations',
        excerpt: 'Discover effective tax planning strategies for multinational corporations operating across borders, including transfer pricing optimization.',
        content: 'Managing cross-border obligations requires a robust transfer pricing policy, thorough documentation, and leveraging double taxation agreements effectively...',
        category: 'Global Tax Trends',
        author: 'Amina Hassan',
        date: '2024-12-10',
        readTime: '6 min read',
        status: 'published',
        image: '/blog/international-tax.jpg',
        featured: true
    },
    {
        id: 3,
        slug: 'vat-compliance-guide',
        title: 'The Complete Guide to VAT Compliance in Kenya',
        excerpt: 'Everything you need to know about VAT registration, filing, and compliance in Kenya. A practical guide for business owners.',
        content: 'Value Added Tax (VAT) in Kenya is governed by the VAT Act 2013. Understanding standard rated, zero-rated, and exempt supplies is critical for accurate filing...',
        category: 'Guides & FAQs',
        author: 'Sarah Wanjiku',
        date: '2024-12-05',
        readTime: '10 min read',
        status: 'published',
        image: '/blog/vat-guide.jpg',
        featured: false
    },
    {
        id: 4,
        slug: 'tax-audit-preparation',
        title: 'How to Prepare for a Tax Audit: A Step-by-Step Guide',
        excerpt: 'Being prepared for a tax audit can make all the difference. Learn the essential steps to take before, during, and after an audit.',
        content: 'Tax audits by revenue authorities can be stressful. Maintaining well-organized reconciliations and working with certified tax practitioners ensures a smooth audit process...',
        category: 'Guides & FAQs',
        author: 'Alexander Omondi',
        date: '2024-11-28',
        readTime: '7 min read',
        status: 'draft',
        image: '/blog/audit-prep.jpg',
        featured: false
    }
];

export const mockNewsletters = [
    {
        id: 1,
        subject: 'December Tax Updates & Year-End Checklist',
        content: 'Stay informed about the latest tax changes, eTIMS compliance deadlines, and statutory year-end requirements in Kenya...',
        status: 'sent',
        sentAt: '2024-12-01 10:00 AM',
        recipients: 150
    },
    {
        id: 2,
        subject: 'Finance Act Advisory: Navigating Withholding Tax Rules',
        content: 'A comprehensive summary for business owners on updated withholding tax deduction and remittance guidelines...',
        status: 'draft',
        sentAt: null,
        recipients: 0
    }
];

export const mockSubscribers = [
    { id: 1, email: 'subscriber1@gmail.com', name: 'Alice Wambui', subscribedAt: '2024-11-01', active: true },
    { id: 2, email: 'subscriber2@yahoo.com', name: 'Bob Mwangi', subscribedAt: '2024-11-05', active: true },
    { id: 3, email: 'subscriber3@gmail.com', name: 'Carol Akinyi', subscribedAt: '2024-11-10', active: false },
    { id: 4, email: 'daniel.otieno@consult.co.ke', name: 'Daniel Otieno', subscribedAt: '2024-11-18', active: true }
];

export const mockTestimonials = [
    {
        id: 1,
        name: 'James Mwangi',
        role: 'Chief Financial Officer',
        company: 'Horizon Logistics Ltd',
        content: 'Optivis Tax transformed our tax planning strategy. Their in-depth understanding of regional tax codes and KRA compliance saved us significant time and money.',
        rating: 5,
        visible: true,
        avatar: '/testimonials/james.jpg'
    },
    {
        id: 2,
        name: 'Grace Njeri',
        role: 'Managing Director',
        company: 'Apex Technologies',
        content: 'Their transfer pricing documentation and cross-border advisory gave us total peace of mind during our regional expansion into Uganda and Rwanda.',
        rating: 5,
        visible: true,
        avatar: '/testimonials/grace.jpg'
    },
    {
        id: 3,
        name: 'Patrick Kipchumba',
        role: 'Founder & CEO',
        company: 'Rift Valley Agribusiness',
        content: 'Prompt, professional, and thorough. The client portal makes requesting services and tracking tax compliance milestones completely seamless.',
        rating: 5,
        visible: true,
        avatar: '/testimonials/patrick.jpg'
    }
];

export const mockAnalytics = {
    totalClients: 154,
    activeRequests: 18,
    completedRequests: 142,
    revenue: 4850000,
    servicesPopularity: [
        { service: 'Tax Advisory & Compliance', count: 48 },
        { service: 'Audit Support & Dispute Resolution', count: 32 },
        { service: 'International Tax & Transfer Pricing', count: 26 },
        { service: 'Corporate Tax Strategy', count: 22 },
        { service: 'Business Registration & Pin Setup', count: 18 }
    ]
};