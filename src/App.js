import React from "react";
import "./App.css";
import Notification from "react-web-notification";
import { createClient } from "@supabase/supabase-js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.optionsMessage = {};
    this.supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    this.supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNDYxMjA2NywiZXhwIjoxOTQwMTg4MDY3fQ._PyxDHMvuguSSgpqpqJDwGPWM9TpYqJQOGCULWe6Xb4";
    this.supabase = createClient(
      this.supabaseUrl,
      this.supabaseKey,
      this.optionsMessage
    );

    this.state = {
      deniedPermission: true,
      title: "",
    };
  }

  async loadMessage() {
    const newMassages = await this.supabase.from("message").select("*");
    console.log(newMassages.data);
  }

  listenMessage() {
    this.supabase
      //.from('*')
      //.from("message")
      .from('message:id=eq.2')
      .on("*", (payload) => {
        console.log(payload);
        const title = "Greenflex IQ Notification";
        const body = "The new item has been update";
        const now =  new Date();
        const tag = now;
        const icon = "http://mobilusoss.github.io/react-web-notification/example/Notifications_button_24.png";
        const options = {
          tag: tag,
          body: body,
          icon: icon,
          lang: "en",
          dir: "ltr",
        };

        this.setState({
          title: title,
          options: options,
        });
      })
      .subscribe();
  }

  async updateMessage() {
    const result = await this.supabase
      .from("message")
      .update({ topic: "other serge" })
      .eq("id", 2);
    // console.log(result)
  }

  componentDidMount() {
    this.loadMessage();
  }

  handlePermissionGranted() {
    console.log("Permission Granted");
    this.setState({
      deniedPermission: false,
    });
  }
  handlePermissionDenied() {
    console.log("Permission Denied");
    this.setState({
      deniedPermission: true,
    });
  }
  handleNotSupported() {
    console.log("Web Notification not Supported");
    this.setState({
      deniedPermission: true,
    });
  }

  handleNotificationOnShow(e, tag) {
    console.log(e, "Notification shown tag: " + tag);
  }

  handleNotificationOnClick(e, tag) {
    console.log(e, "Notification clicked tag:" + tag);
  }

  handleNotificationOnError(e, tag) {
    console.log(e, "Notification error tag:" + tag);
  }

  handleNotificationOnClose(e, tag) {
    console.log(e, "Notification closed tag:" + tag);
  }

  handleButtonClick() {
    if (this.state.deniedPermission) {
      return;
    }
  }

  handleButtonClick2() {
    this.props.swRegistration
      .getNotifications({})
      .then(function (notifications) {
        console.log(notifications);
      });
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.listenMessage.bind(this)}>
            Listen lauch Message
          </button>
          <button onClick={this.updateMessage.bind(this)}>
            Update Message
          </button>
          {document.title === "swExample" && (
            <button onClick={this.handleButtonClick2.bind(this)}>
              swRegistration.getNotifications
            </button>
          )}
          <Notification
            ignore={this.state.deniedPermission && this.state.title !== ""}
            notSupported={this.handleNotSupported.bind(this)}
            onPermissionGranted={this.handlePermissionGranted.bind(this)}
            onPermissionDenied={this.handlePermissionDenied.bind(this)}
            onShow={this.handleNotificationOnShow.bind(this)}
            onClick={this.handleNotificationOnClick.bind(this)}
            onClose={this.handleNotificationOnClose.bind(this)}
            onError={this.handleNotificationOnError.bind(this)}
            timeout={5000}
            title={this.state.title}
            options={this.state.options}
            swRegistration={this.props.swRegistration}
          />
        </div>
      </div>
    );
  }
}

export default App;
