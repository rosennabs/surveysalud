{
  /* Section: Resource Hub */
}

<section
  id="resource-hub"
  ref={resourceHubRef}
  className="flex flex-col items-center mx-32 mt-48"
>
  <h1 className="pb-8 mt-8 z-10">RESOURCE HUB</h1>

  <div className="flex flex-wrap justify-center text-black w-full z-10 mt-16 space-x-12">
    <Link href="/annual_report">
      <div className={resourceCard}>
        <div className={titleContainer}>
          <img className={image} src="/bar chart.svg" alt="a bar chart" />
          <h4>Annual Report</h4>
        </div>

        <p className={text}>
          2023-24 Annual Report. Take a deep dive into our annual progress.
        </p>
      </div>
    </Link>

    <Link href="/annual_report">
      <div className={resourceCard}>
        <div className={titleContainer}>
          <img className={image} src="/book.svg" alt="a book" />
          <h4>Directory</h4>
        </div>
        <p className={text}>
          Search for the meaning of our indicators in the PMF directory.
        </p>
      </div>
    </Link>

    <Link href="/annual_report">
      <div className={resourceCard}>
        <div className={titleContainer}>
          <img className={image} src="/puzzle.svg" alt="a puzzle" />
          <h4>Logic Model</h4>
        </div>
        <p className={text}>
          This is where we connect the dots to achieve our ultimate goal.
        </p>
      </div>
    </Link>
  </div>

  <div className="flex flex-wrap justify-center text-black w-full z-10 mt-16 space-x-12">
    <Link href="/annual_report">
      <div className={resourceCard}>
        <div className={titleContainer}>
          <img className={image} src="/loop.svg" alt="a loop" />
          <h4>Change Theory</h4>
        </div>
        <p className={text}>
          Understand our theory of change and how we intend to make a
          difference.
        </p>
      </div>
    </Link>

    <Link href="/annual_report">
      <div className={resourceCard}>
        <div className={titleContainer}>
          <img className={image} src="/target.svg" alt="round target" />
          <h4>Annual Targets</h4>
        </div>
        <p className={text}>
          We are set to meet the following targets for the year.
        </p>
      </div>
    </Link>

    <Link href="/annual_report">
      <div className={resourceCard}>
        <div className={titleContainer}>
          <img className={image} src="/graph.svg" alt="a line graph" />
          <h4>PMF</h4>
        </div>
        <p className={text}>
          The Performance Measurement Framework outlines our indicators.
        </p>
      </div>
    </Link>
  </div>
</section>;

{
  /* Section: Services */
}
<section id="our-services" className="mx-32 my-64">
  <OurServices />
</section>;

{
  /* Section: Our Team */
}
<section id="the-team" className="mx-32 mb-64">
  <OurTeam />
</section>;

{
  /* Section: Contact us */
}
<section id="contact-us" className="mx-24">
  <div className="flex relative">
    <img
      className="w-3/5"
      src="/contactUs.jpg"
      alt="image of people in the office"
    />
    <div className="flex absolute inset-10 z-10 w-full">
      <div
        className="flex absolute right-0 top-2 w-1/2 mr-8"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex flex-col items-center w-full">
          <h2 className="m-8 text-white">Contact Us</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
</section>;
