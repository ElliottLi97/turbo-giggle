const styles ={
    container: {
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        width: "100%",
    },
    paragraph: {
        marginTop: "0",
        marginBottom: "1rem",
        },
    row:{
        display: "flex",
        flexWrap: "wrap",
        marginRight: "-15px",
        marginLeft: "-15px",
    },
    card: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        wordWrap: "break-word",
        backgroundColor: "#fff",
        backgroundClip: "border-box",
        borderRadius: ".25rem",
    }
}

const Body = ()     => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.title}>
                        <h2> Welcome {{patient.name}}!</h2>
                          <p styles={styles.paragraph}>This is a secure medical portal to help connect and provide you with access and tools to assist you with your medical needs </p>
 <div class="row" styles={styles.row}>
        <div class="col-sm col-xs-12">
            <div class="card " styles={styles.card}">
                <img src="publiccopy/image/appointments.png" alt="Card appointment" />
                <h5 class="card-title">Upcoming Appointments <a href="/appointments/signup" class="edit-history-link-text"><img
                            class="edit-history-link" src="/image/add_appointments.png"> Add</a></h5>
                <!-- Add doctors primary care provider -->

                {{#each appointments as |appointment| }}
                <div class="col-sm col-xs-12 appointmentcard">
                    <p class="card-text">Dr. {{appointment.doctor.name}}<br> at {{appointment.datetime}}</p>
                    <p class="card-text"><strong>Reason(s) for visit: {{appointment.concern}}</strong></p>
                    <p class="card-text"><strong>{{appointment.status}}</strong></p>

                </div>
                {{/each}}
            </div>
        </div>
        <div class="col-sm col-xs-12">
        <div class="card " styles={styles.card}">
                <img src="/image/history.png" alt="Card history" />
                <h5 class="card-title">Patient History <a href="/history" class="edit-history-link-text"><img
                            class="edit-history-link" src="/image/edit.png"> Edit</a></h5>
                <h6 class="card-subtitle mb-2 text-muted">Height: {{patient.history.height}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Weight: {{patient.history.weight}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Allergies: {{patient.history.allergies}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Current Medications: {{patient.history.medications}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Prior History Data: {{patient.history.data}}</h6>
            </div>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-sm col-xs-12">
            <div class="card" styles={styles.card}>
                <h5 class="card-title">Chat here!</h5>
                <div class="col-sm col-xs-12">
                    <p class="card-text">{{> chatLogin }}</p>
                </div>
            </div>
        </div>
    </div>
        {{!-- <div class="col-sm col-xs-12">
            <div class="card" styles={styles.card}>
                <img src="//placehold.it/250?text=AhPuch.jpg" alt="Card image cap" />
                <h1> Ah Puch</h1>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                    content. This content is a little bit longer.</p>
            </div>
        </div> --}}
</div>