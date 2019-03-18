package com.sunlearning.messanger.library.data;

import java.io.ByteArrayInputStream;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

public class BlobTypeHandler extends BaseTypeHandler<byte[]> {

  @Override
  public byte[] getNullableResult(ResultSet rs, String columnName) throws SQLException {
    Blob blob = (Blob) rs.getBlob(columnName);
    byte[] returnValue = null;
    
    if (blob != null) {
      returnValue = blob.getBytes(1,  (int) blob.length());
    }
    
    return returnValue;
  }

  @Override
  public byte[] getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
    Blob blob = (Blob) rs.getBlob(columnIndex);
    byte[] returnValue = null;
    
    if (blob != null) {
      returnValue = blob.getBytes(1,  (int) blob.length());
    }
    
    return returnValue;
  }

  @Override
  public byte[] getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
    Blob blob = cs.getBlob(columnIndex);
    byte[] returnValue = null;
    
    if (blob != null) {
      returnValue = blob.getBytes(1,  (int) blob.length());
    }
    
    return returnValue;
  }

  @Override
  public void setNonNullParameter(PreparedStatement ps, int i, byte[] parameter, JdbcType jdbcType) throws SQLException {
    ByteArrayInputStream input = new ByteArrayInputStream(parameter);
    ps.setBinaryStream(i, input, parameter.length);
  }

}
