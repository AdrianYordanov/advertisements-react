import * as React from "react";

// Components
import UserAdvertisement from "./UserAdvertisement";

// Contracts
import { IAdvertisement } from "src/utils/Contracts";

export interface IProps {
  data: IAdvertisement[];
  getAdvertisements: () => void;
  deleteAdvertisement: (advertisementId: string) => void;
}

class UserAdvertisements extends React.Component<IProps, any> {
  public componentWillMount = () => {
    this.props.getAdvertisements();
  };

  public render() {
    const { data, deleteAdvertisement } = this.props;
    return (
      <React.Fragment>
        <h1 style={{ margin: "40px" }}>
          You have {data.length} advertisements.
        </h1>
        <table
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 1em",
            width: "95%"
          }}
        >
          <tbody>
            {data.map((advertisement: IAdvertisement) => {
              return (
                <UserAdvertisement
                  key={advertisement._id}
                  advertisement={advertisement}
                  deleteAdvertisement={deleteAdvertisement}
                />
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default UserAdvertisements;
