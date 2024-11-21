package com.ratanone.shuaipoc.services;

import com.ratanone.shuaipoc.generated.types.*;
import com.ratanone.shuaipoc.repository.JdbcRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GenericConfigServiceImpl implements GenericConfigService {

  @Autowired private JdbcRepository jdbcRepository;

  @Override
  public UltraQueryResult fetchGenericConfigs(UltraQueryInput ultraQueryInput) {
    return jdbcRepository.queryGenericConfigsFromRealtime(ultraQueryInput);
  }

  @Override
  public GenericConfig fetchGenericConfig(String key) {
    return jdbcRepository.queryGenericConfigsByKey(key);
  }

  @Override
  public GenericConfig addGenericConfig(AddGenericConfigInput addGenericConfigInput) {
    return jdbcRepository.addGenericConfig(addGenericConfigInput);
  }

  @Override
  public Boolean removeGenericConfig(String key) {
    return jdbcRepository.removeGenericConfig(key);
  }

  @Override
  public GenericConfig updateGenericConfig(
      String key, MutableGenericConfigInput mutableGenericConfigInput) {
    return jdbcRepository.updateGenericConfig(key, mutableGenericConfigInput);
  }
}
