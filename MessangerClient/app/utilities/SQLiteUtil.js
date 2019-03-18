import SQLiteStorage from 'react-native-sqlite-storage'
import * as StorageUtil from './StorageUtil'

SQLiteStorage.DEBUG(true)
SQLiteStorage.enablePromise(true)

class SQLiteUtil {

  open = async () => {
    if (this.db) {
      return
    }
    
    const user = await StorageUtil.getObject('user')
    this.db = await SQLiteStorage.openDatabase(`imdata_${user.oguCode}.db`, '1.0', 'IMData', -1)

    return this.db
  }

  close = async () => {
    if (this.db) {
      await this.db.close()
    }

    this.db = null
  }

  executeSql = async (sql, params) => {
    if (params) {
      const res = await this.db.executeSql(sql, params)
      return res
    } else {
      const res = await this.db.executeSql(sql)
      return res
    }
  }

  executeList = async (list) => {
    for (let i = 0; i < list.length; i++) {
      await this.db.transaction(async (tx) => {
        if (list[i].params) {
          await tx.executeSql(list[i].sql, list[i].params)
        } else {
          await tx.executeSql(list[i].sql)
        }
      })
    }
  }
  
}

export default new SQLiteUtil()
