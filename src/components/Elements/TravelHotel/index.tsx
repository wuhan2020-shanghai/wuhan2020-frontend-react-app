import * as React from "react";
import styles from "../../../styles/elements/travelhotel/travelHotel.module.scss";
import Card from "../Card";
import { ITravelHotel } from "../../../types/interfaces";
import { History } from "history";
import { Icon, Row } from "antd";

interface TravelHotelProps {
  travelhotel: ITravelHotel;
  history: History;
}

export default class TravelHotelCard extends React.PureComponent<
  TravelHotelProps,
  {}
> {
  openMap = () => {
    const { travelhotel } = this.props;
		const { address = "", province = "", city="", name="" }  = travelhotel;

    if (address && address !== '-') {
      window.open(
        ["https://ditu.amap.com/search?query=", address].join("")
      );
    }else if(name && name!== '-'){
			const address = [province, city, name].join(" ");

			window.open(
        ["https://ditu.amap.com/search?query=", address].join("")
      );
		}
  };

  render() {
    const { travelhotel } = this.props;
    return (
      <Card className={styles.elementsTravelHotelCard}>
        <div className={styles.contentWrapper}>
          <Row className={styles.lineInfo}>
            <div className={styles.name}>{travelhotel.name}</div>
            <Icon type="right-circle" />
          </Row>
          <Row className={styles.lineInfo + " " + styles.greyFont}>
            {travelhotel.city ? (
              <div style={{ marginRight: "20px" }}>
                {travelhotel.city.split("-").map(el => (
                  <span>{el}</span>
                ))}
              </div>
            ) : null}
            {travelhotel.date ? (
              <div>
                发布于{new Date(travelhotel.date).getFullYear()}年
                {new Date(travelhotel.date).getMonth() + 1}月
                {new Date(travelhotel.date).getDate()}日
              </div>
            ) : null}
          </Row>
          <Row style={{ fontSize: "16px", marginBottom: "10px" }}>
            <Icon type="bank" style={{ marginRight: "19px" }} />
            <span style={{ marginRight: "10px" }}>{travelhotel.address}</span>
            <span className={styles.viewMap} onClick={this.openMap}>
              查看地图
            </span>
          </Row>
          {travelhotel.contacts ? (
            <Row style={{ fontSize: "16px" }}>
              <Icon type="phone" style={{ marginRight: "19px" }} />
              {travelhotel.contacts[0].name ? (
                <span style={{ marginRight: "10px" }}>
                  travelhotel.contacts[0].name
                </span>
              ) : null}
              <span>{travelhotel.contacts[0].tel}</span>
            </Row>
          ) : null}
        </div>
      </Card>
    );
  }
}
