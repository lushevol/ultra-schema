package com.ratanone.shuaipoc.services;

import com.ratanone.shuaipoc.generated.types.AddGenericConfigInput;
import com.ratanone.shuaipoc.generated.types.GenericConfig;
import com.ratanone.shuaipoc.generated.types.MutableGenericConfigInput;
import java.util.List;

public interface GenericConfigService {
  List<GenericConfig> fetchGenericConfigs(String query);

  GenericConfig fetchGenericConfig(String key);

  GenericConfig addGenericConfig(AddGenericConfigInput addGenericConfigInput);

  Boolean removeGenericConfig(String key);

  GenericConfig updateGenericConfig(String key, MutableGenericConfigInput payload);
}
