import React, { Component } from "react";

import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Table,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import korrona from "./korona.png";
import Sound from "react-native-sound";

import music from "./signal_of_mario.mp3";
import firstPlaceSound from "./The_king.mp3";
var ding = new Sound(music, Sound.MAIN_BUNDLE, (error) => {});
var firstPlaceDing = new Sound(
  firstPlaceSound,
  Sound.MAIN_BUNDLE,
  (error) => {}
);

const firstCellHeight = 14;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      maindata: [],
      main: false,
      test: "",
      maunsumm: 0,
      gen: 0,
      isLoading: true,
    };
  }

  componentWillUnmount() {
    ding.stop();
    ding.release();
    firstPlaceDing.stop();
    firstPlaceDing.release();
  }

  componentDidMount() {
    setInterval(() => {
      fetch("http://192.168.100.14:5000/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (this.state.gen < result.subss) {
            ding.play();
          } else {
            ding.stop();
            ding.release();
            // this.setState({
            //   gen: result.subss
            // })
          }

          this.setState({
            maunsumm: result,
            test: result.message,
            gen: result.subss,
          });

          for (var i = 0; i < result.message.length; i++) {
            for (var o = 0; o < result.test.СписокЗаказов.Заказ.length; o++) {
              if (result.test.СписокЗаказов.Заказ[o].Менеджер._text != null) {
                if (
                  result.test.СписокЗаказов.Заказ[o].СуммаДокумента._text !=
                  null
                ) {
                  if (
                    result.test.СписокЗаказов.Заказ[o].Менеджер._text ==
                    result.message[i].name
                  ) {
                    result.message[i].arrasum.push(
                      parseFloat(
                        result.test.СписокЗаказов.Заказ[o].СуммаДокумента._text
                      )
                    );
                  }
                }
              }
            }
          }
          for (var i = 0; i < result.message.length; i++) {
            let bbb = result.message[i].arrasum.reduce(function (sum, elem) {
              return sum + elem;
            }, 0);

            // get first 7 elements from result.message
            const phoneNumbers = result.message.slice(0, 7);

            // previous data
            const prevPhoneNumbers = [...this.state.maindata];
            const clonePhoneNumbers = [...result.message];

            const contact = clonePhoneNumbers[i];
            if (contact) {
              (contact.sum = bbb), (contact.count = contact.arrasum.length);
            }
            clonePhoneNumbers.sort((a, b) => {
              return a.sum < b.sum;
            });
            if (
              prevPhoneNumbers.length > 0 &&
              clonePhoneNumbers.length > 0 &&
              prevPhoneNumbers[0].name != clonePhoneNumbers[0].name
            ) {
              firstPlaceDing.play();
            } else {
              firstPlaceDing.stop();
              firstPlaceDing.release();
            }
            this.setState(() => ({
              maindata: clonePhoneNumbers,
            }));
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, 10000);
  }

  render() {
    const { maindata, maunsumm, data, isLoading } = this.state;

    if (maindata == undefined) {
      return (
        <View>
          <Text></Text>
        </View>
      );
    } else {
      if (!isLoading) {
        return (
          <View>
            <Text>test</Text>
          </View>
        );
      } else {
        return (
          <View>
            <ScrollView>
              <View style={styles.container}>
                <Grid>
                  <Col size={30}>
                    <Row style={styles.cellerrss}>
                      <Text style={styles.titletexterrssss}>№</Text>
                    </Row>
                    {maindata.map((user, ids) => (
                      <Row key={ids} style={styles.cell}>
                        {(() => {
                          if (ids == 0) {
                            return (
                              <Row
                                key={ids}
                                style={
                                  (styles.cellf,
                                  {
                                    backgroundColor: "#91BAFF",
                                  })
                                }
                              >
                                <Image
                                  style={{
                                    width: 20,
                                    height: firstCellHeight,
                                    marginRight: 17,
                                    marginLeft: 10,
                                    marginTop: 2,
                                  }}
                                  source={korrona}
                                />
                                <Text
                                  style={styles.titletextssseerrrdsfdsfsd00}
                                >
                                  {ids + 1}
                                </Text>
                              </Row>
                            );
                          } else if (ids == 1) {
                            return (
                              <Row key={ids} style={styles.cellf}>
                                <View
                                  style={{
                                    width: 20,
                                    height: firstCellHeight,
                                    marginLeft: 4,
                                  }}
                                ></View>
                                <Text style={styles.titletextsss}>
                                  {ids + 1}
                                </Text>
                              </Row>
                            );
                          } else if (ids == 2) {
                            return (
                              <Row key={ids} style={styles.cellf}>
                                <View
                                  style={{
                                    width: 20,
                                    height: firstCellHeight,
                                    marginLeft: 4,
                                  }}
                                ></View>
                                <Text style={styles.titletextsss}>
                                  {ids + 1}
                                </Text>
                              </Row>
                            );
                          } else {
                            return (
                              <Row key={ids} style={styles.cell}>
                                <View
                                  style={{
                                    width: 20,
                                    height: firstCellHeight,
                                    marginLeft: 4,
                                  }}
                                ></View>
                                <Text style={styles.titletext}>{ids + 1}</Text>
                              </Row>
                            );
                          }
                        })()}
                      </Row>
                    ))}
                  </Col>

                  <Col size={100}>
                    <Row style={styles.cellerrss}>
                      <Text style={styles.titletexterrssss}>Рейтинг</Text>
                    </Row>
                    {maindata.map((user, ids) => (
                      <Row key={ids} style={styles.cell}>
                        {(() => {
                          if (ids == 0) {
                            return (
                              <Row key={ids} style={styles.cellf}>
                                <Text style={styles.titletextssseerrrdsfdsfsd}>
                                  КИНГКОНГ
                                </Text>
                              </Row>
                            );
                          } else if (ids == 1) {
                            return (
                              <Row key={ids} style={styles.cellf}>
                                <Text style={styles.titletextsss}>ГРОМИЛА</Text>
                              </Row>
                            );
                          } else if (ids == 2) {
                            return (
                              <Row key={ids} style={styles.cellf}>
                                <Text style={styles.titletextsss}>МОНСТР</Text>
                              </Row>
                            );
                          } else if (ids == 3) {
                            return (
                              <Row key={ids} style={styles.cell}>
                                <Text style={styles.titletext}>АМБАЛ</Text>
                              </Row>
                            );
                          } else if (ids == 4) {
                            return (
                              <Row key={ids} style={styles.cell}>
                                <Text style={styles.titletext}>БУГАЙ</Text>
                              </Row>
                            );
                          } else if (ids == 5) {
                            return (
                              <Row key={ids} style={styles.cell}>
                                <Text style={styles.titletext}>КРЕПЫШ</Text>
                              </Row>
                            );
                          } else if (ids == 6) {
                            return (
                              <Row key={ids} style={styles.cell}>
                                <Text style={styles.titletext}>ДЕТИНА </Text>
                              </Row>
                            );
                          } else if (ids == 7) {
                            return (
                              <Row key={ids} style={styles.cell}>
                                <Text style={styles.titletext}>КРЕНДЕЛЬ</Text>
                              </Row>
                            );
                          } else if (ids == 8) {
                            return (
                              <Row key={ids} style={styles.cell}>
                                <Text style={styles.titletext}>ЧАЙНИК</Text>
                              </Row>
                            );
                          } else if (ids == 9) {
                            return (
                              <Row key={ids} style={styles.cell}>
                                <Text style={styles.titletext}>САЛАГА</Text>
                              </Row>
                            );
                          } else if (ids == 10) {
                            return (
                              <Row key={ids} style={styles.cell}>
                                <Text style={styles.titletext}> СЛАБАК</Text>
                              </Row>
                            );
                          } else if (ids == 11) {
                            return (
                              <Row key={ids} style={styles.cell}>
                                <Text style={styles.titletext}>ДОХЛЯК</Text>
                              </Row>
                            );
                          } else {
                            return (
                              <Row key={ids} style={styles.cell}>
                                <Text style={styles.titletext}>ИНФУЗОРИЯ</Text>
                              </Row>
                            );
                          }
                        })()}
                      </Row>
                    ))}
                  </Col>

                  <Col size={100}>
                    <Row style={styles.cellerrss}>
                      <Text style={styles.titletexterrssss}>ФИО</Text>
                    </Row>
                    {maindata.map((user, ids) => (
                      <Row key={ids} style={styles.cell}>
                        {(() => {
                          if (ids == 0) {
                            return (
                              <Row style={styles.cellf}>
                                {(() => {
                                  let str = user.name.split(" ");
                                  return (
                                    <Text
                                      style={styles.titletextssseerrrdsfdsfsd}
                                    >
                                      {str[1]} {str[2].charAt(0)}.
                                    </Text>
                                  );
                                })()}
                              </Row>
                            );
                          } else if (ids == 1) {
                            return (
                              <Row style={styles.cellf}>
                                {(() => {
                                  let str = user.name.split(" ");
                                  return (
                                    <Text style={styles.titletextsss}>
                                      {str[1]} {str[2].charAt(0)}.
                                    </Text>
                                  );
                                })()}
                              </Row>
                            );
                          } else if (ids == 2) {
                            return (
                              <Row style={styles.cellf}>
                                {(() => {
                                  let str = user.name.split(" ");
                                  return (
                                    <Text style={styles.titletextsss}>
                                      {str[1]} {str[2].charAt(0)}.
                                    </Text>
                                  );
                                })()}
                              </Row>
                            );
                          } else {
                            return (
                              <Row style={styles.cell}>
                                {(() => {
                                  let str = user.name.split(" ");
                                  return (
                                    <Text style={styles.titletext}>
                                      {str[1]} {str[2].charAt(0)}.
                                    </Text>
                                  );
                                })()}
                              </Row>
                            );
                          }
                        })()}
                      </Row>
                    ))}
                  </Col>
                  <Col size={100}>
                    <Row style={styles.cellerrss}>
                      <Text style={styles.titletexterrssss}>Сумма</Text>
                    </Row>

                    {maindata.map((user, ids) => (
                      <Row key={ids} style={styles.cell}>
                        {(() => {
                          if (ids == 0) {
                            return (
                              <Row style={styles.cellf}>
                                <Text
                                  style={styles.titletextssseerrrdsfdsfsd00}
                                >
                                  {new Intl.NumberFormat("ru-Ru").format(
                                    user.sum
                                  )}
                                </Text>
                              </Row>
                            );
                          } else if (ids == 1) {
                            return (
                              <Row style={styles.cellf}>
                                <Text style={styles.titletextsss}>
                                  {new Intl.NumberFormat("ru-Ru").format(
                                    user.sum
                                  )}
                                </Text>
                              </Row>
                            );
                          } else if (ids == 2) {
                            return (
                              <Row style={styles.cellf}>
                                <Text style={styles.titletextsss}>
                                  {new Intl.NumberFormat("ru-Ru").format(
                                    user.sum
                                  )}
                                </Text>
                              </Row>
                            );
                          } else {
                            return (
                              <Row style={styles.cell}>
                                <Text style={styles.titletext}>
                                  {new Intl.NumberFormat("ru-Ru").format(
                                    user.sum
                                  )}
                                </Text>
                              </Row>
                            );
                          }
                        })()}
                      </Row>
                    ))}
                  </Col>
                  <Col size={35}>
                    <Row style={styles.cellerrss}>
                      <Text style={styles.titletexterrssss}>Сделки</Text>
                    </Row>

                    {maindata.map((user, ids) => (
                      <Row key={ids} style={styles.cell}>
                        {(() => {
                          if (ids == 0) {
                            return (
                              <Row style={styles.cellf}>
                                <Text style={styles.titletextssseerrrdsfdsfsd}>
                                  {user.count}
                                </Text>
                              </Row>
                            );
                          } else if (ids == 1) {
                            return (
                              <Row style={styles.cellf}>
                                <Text style={styles.titletextsss}>
                                  {user.count}
                                </Text>
                              </Row>
                            );
                          } else if (ids == 2) {
                            return (
                              <Row style={styles.cellf}>
                                <Text style={styles.titletextsss}>
                                  {user.count}
                                </Text>
                              </Row>
                            );
                          } else {
                            return (
                              <Row style={styles.cell}>
                                <Text style={styles.titletext}>
                                  {user.count}
                                </Text>
                              </Row>
                            );
                          }
                        })()}
                      </Row>
                    ))}
                  </Col>
                </Grid>
                <Grid>
                  <Col size={100}>
                    <Row>
                      <View style={styles.containere}>
                        <Text style={styles.titletexte}>
                          {new Intl.NumberFormat("ru-Ru").format(
                            this.state.gen
                          )}
                        </Text>
                      </View>
                    </Row>
                  </Col>
                </Grid>
              </View>
              <View></View>
            </ScrollView>
          </View>
        );
      }
    }
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    backgroundColor: "white",
  },
  containere: {
    textAlign: "center", // <-- the magic
    backgroundColor: "white",
    width: "100%",
  },
  cell: {
    borderTopWidth: 1,
    //  borderWidth: 0.5,
    borderRightWidth: 0,
    borderLeftWidth: 0,

    borderColor: "#E9E9E9",
    flex: 1,
    minHeight: firstCellHeight,
    justifyContent: "center",

    alignItems: "center",
  },
  cellerrss: {
    backgroundColor: "#3D479A",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    // borderColor: '№ECECEC',
    flex: 1,
    minHeight: 20,
    justifyContent: "center",

    alignItems: "center",
  },
  titletexterrssss: {
    fontSize: 18,
    fontWeight: "900",
    color: "white",
  },
  titletextssseerrrdsfdsfsd: {
    color: "#ffc60a",
    fontSize: 14,
    fontWeight: "900",
  },
  titletextssseerrrdsfdsfsd00: {
    color: "#ffc60a",
    fontSize: 14,
    fontWeight: "900",
    paddingLeft: 0,
  },
  cellf: {
    backgroundColor: "#91BAFF",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flex: 1,
    minHeight: 15,

    justifyContent: "center",

    alignItems: "center",
  },
  cellfg: {
    backgroundColor: "#91BAFF",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flex: 1,
    minHeight: 20,
    paddingLeft: 20,
    justifyContent: "center",

    alignItems: "center",
  },
  titletext: {
    fontSize: 14,
    color: "black",
  },
  titletextsss: {
    fontSize: 14,
    color: "white",
  },
  titletexte: {
    textAlign: "center", // <-- the magic
    color: "black",
    fontWeight: "900",
    fontSize: 45,
  },
});
