package com.sunlearning.messanger.pojo;

import lombok.Data;

@Data
public abstract class OguBaseInfo {
    private String oguCode;
    private String oguName;
    private String parentCode;
    private String pathCode;
    private String pathName;
    private long sortOrder;
    public abstract OguType getOguType();
}
