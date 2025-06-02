import React from 'react';


const CTA = () => {
    return (
        <section className="bg-muted py-16 px-12 bg-gray-100">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Plan Your Perfect Trek</h2>
                        <p className="text-muted-foreground mb-6">
                            Our budget planner helps you create a personalized trekking experience based on your preferences and
                            budget. Get recommendations for stays, food, transportation, and more.
                        </p>



                        <button 
                         className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg"
                            >
                            Try Budget Planner
                        </button>

                    </div>
                    <div className="bg-background rounded-lg p-6 shadow-lg">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-medium">What you will get:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-green-200 p-1 mt-0.5">
                                            <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span>Customized trip duration based on your schedule</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-green-200 p-1 mt-0.5">
                                            <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span>Accommodation options from budget to luxury</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-green-200 p-1 mt-0.5">
                                            <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span>Local cuisine recommendations and food budget</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-green-200 p-1 mt-0.5">
                                            <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span>Transportation options with cost estimates</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-green-200 p-1 mt-0.5">
                                            <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span>Complete expense breakdown for better planning</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA;