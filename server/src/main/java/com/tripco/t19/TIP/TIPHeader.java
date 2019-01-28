package com.tripco.t19.TIP;

public abstract class TIPHeader {
  protected Integer requestVersion;
  protected String requestType;

  public abstract void buildResponse();
}
