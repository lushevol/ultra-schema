package com.ratanone.shuaipoc.services;

import com.ratanone.shuaipoc.generated.types.*;

public interface GenericConfigService {
  UltraQueryResult fetchGenericConfigs(UltraQueryInput ultraQueryInput);

  GenericConfig fetchGenericConfig(String key);

  GenericConfig addGenericConfig(AddGenericConfigInput addGenericConfigInput);

  Boolean removeGenericConfig(String key);

  GenericConfig updateGenericConfig(String key, MutableGenericConfigInput payload);
}
