<View style={styles.root}>
          <View style={styles.inputBox}>
            <Picker
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(itemValue, itemIndex) => this.pickFunction(itemValue, itemIndex) } >
              <Picker.Item label="Farm" value="" />
                { this.farmlist() }
            </Picker>
</View>
<View style={styles.inputBox}>
            <Picker
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(itemValue, itemIndex) => this.pickFunction(itemValue, itemIndex) } >
              <Picker.Item label="Flock" value="" />
               
            </Picker>
          
</View>

        <Table borderStyle={{borderWidth: 1, borderColor: 'green'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>

        </View>